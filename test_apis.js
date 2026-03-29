const https = require('https');

function fetchUrl(url, name) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`\n--- ${name} ---`);
      console.log(`Status: ${res.statusCode}`);
      try {
        const json = JSON.parse(data);
        console.log(Object.keys(json));
        if(json.status === 'error') console.log("Error:", json.message);
      } catch (e) {
        console.log("Response starts with:", data.substring(0, 100));
      }
    });
  }).on('error', err => {
    console.log(`\n--- ${name} ERR ---`, err.message);
  });
}

fetchUrl('https://leetcode-stats-api.herokuapp.com/Kushagra395', 'LeetCode Stats API');
fetchUrl('https://codechef-api.vercel.app/handle/kushagra_395', 'CodeChef API');
fetchUrl('https://geeks-for-geeks-api-mu.vercel.app/kushagra20rdeg', 'GFG API');
