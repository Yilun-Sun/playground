let axios = require('axios');
// let cheerio = require('cheerio');
// let fs = require('fs');

axios
  .get(
    'https://api.worldoftanks.com/wot/account/list/?application_id=9ac9f425f534dca03b4ab84d40bb7310&search=anubis_nero'
  )
  .then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data.data);
      }
    },
    (error) => console.log(error)
  );
