const fs = require('fs');

try {
  let fileData = fs.readFileSync('codolio.json', 'utf8');
  let data;
  try {
    data = JSON.parse(fileData);
  } catch(e) {
    console.log("Failed to parse codolio.json");
    if (fileData.includes("<!DOCTYPE html>")) {
        console.log("Looks like raw HTML instead of JSON proxy wrapping.");
        data = { contents: fileData };
    } else {
        process.exit(1);
    }
  }

  const html = data.contents;
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  
  if (match) {
    const jsonStr = match[1];
    const jsonObj = JSON.parse(jsonStr);
    
    // Save the entire parsed JSON to explore it easily
    fs.writeFileSync('codolio_parsed.json', JSON.stringify(jsonObj, null, 2));

    console.log("Found __NEXT_DATA__. Look at codolio_parsed.json.");
    
    // Check if userProfile exists somewhere
    // e.g., pageProps.userProfile
    let userProfile = jsonObj.props?.pageProps?.userProfile || jsonObj.props?.pageProps?.initialState?.userProfile;
    
    console.log("Props top level keys:", Object.keys(jsonObj.props || {}));
    if (jsonObj.props?.pageProps) console.log("pageProps keys:", Object.keys(jsonObj.props.pageProps));
    
  } else {
    console.log("No __NEXT_DATA__ block found in HTML.");
  }
} catch (e) {
  console.log("Error:", e.message);
}
