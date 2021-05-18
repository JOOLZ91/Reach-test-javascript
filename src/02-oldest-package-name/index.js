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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */
const fetch = require('node-fetch');

module.exports = async function oldestPackageName() {
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
    data = await response.json();
    const contentArray = data.content.map(i => i.package);
    sortedByDateArray = contentArray.sort(function (a, b) {
      const dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB;
    });
    const name = sortedByDateArray[0].name;
    return name;
  } catch (error) {
    console.log(error);
  }
};
