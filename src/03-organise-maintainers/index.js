/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */
const fetch = require('node-fetch');

module.exports = async function organiseMaintainers() {
  // TODO
  let response = await fetch(
    'http://ambush-api.inyourarea.co.uk/ambush/intercept',
    {
      method: 'POST',
      body: JSON.stringify({
        url: 'https://api.npms.io/v2/search/suggestions?q=react',
        method: 'GET',
        return_payload: true,
      }),
    },
  );
  try {
    // Push maintainers to empty object
    data = await response.json();
    const res = data.content;
    const arrayOfMainteners = res.map(i => i.package.maintainers);
    let users = {};
    arrayOfMainteners.map(i => {
      i.map(user => {
        users[user.username] = [];
      });
    });

    // Push packages to maintainers
    res.map(i => {
      const name = i.package.name;
      i.package.maintainers.map(user => {
        users[user.username].push(name);
      });
    });

    // Push and sort maintainers with packages to empty array
    let maintainers = [];
    const newArray = Object.entries(users);
    newArray.forEach(i => {
      maintainers.push({ username: i[0], packageNames: i[1] });
    });

    maintainers.sort((a, b) => a.username.localeCompare(b.username));
    maintainers.forEach(i => i.packageNames.sort((a, b) => a.localeCompare(b)));
    return maintainers;
  } catch (error) {
    console.log(error);
  }
};
