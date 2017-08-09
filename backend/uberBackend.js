///routes
const express = require('express');
const router = express.Router();
const Uber = require('node-uber');


const uber = new Uber({
  client_id: process.env.UBER_CLIENT_ID,
  client_secret: process.env.UBER_CLIENT_SECRET,
  server_token: process.env.UBER_SERVER_TOKEN,
  redirect_uri: 'http://localhost:3000/api/callback',
  name: 'IRIS',
  language: 'en_US', // optional, defaults to en_US
  sandbox: true // optional, defaults to false
});

router.get('/login', function(req, res) {
  var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
  res.redirect(url);
});

router.get('/callback', function(req, res) {
   uber.authorizationAsync({authorization_code: req.query.code})
   .spread(function(access_token, refresh_token, authorizedScopes, tokenExpiration) {
     // store the user id and associated access_token, refresh_token, scopes & token expiration date
     console.log('New access_token retrieved: ' + access_token);
     console.log('... token allows access to scopes: ' + authorizedScopes);
     console.log('... token is valid until: ' + tokenExpiration);
     console.log('... after token expiration, re-authorize using refresh_token: ' + refresh_token);
     // redirect the user back to actual app
     res.redirect('/');
   })
   .error(function(err) {
     console.error('ERROR:', err);
   });
});

router.get('/products', function(req, res) {
    // extract the query from the request URL
    let query = req.query
    // if no query params sent, respond with Bad Request
    if (!query || !query.lat || !query.lng) {
      res.sendStatus(400);
    } else {
      uber.products.getAllForLocationAsync(query.lat, query.lng)
      .then(function(resp) {
          res.send(resp.products);
      })
      .error(function(err) {
        console.error("could not get available products", err);
        res.sendStatus(500);
      });
    }
  })

router.get('/price', function(req, res) {
  let query = req.query
  uber.estimates.getPriceForRouteByAddressAsync(
  '1412 Market St, San Francisco, CA 94103, US',
  query.destination)
  .then(function(resp) {
    res.send(resp);
  })
  .error(function(err) {
    console.error("could not get price estimate", err);
  });
})


router.get('/estimate', function(req, res) {
  let query = req.query;
  uber.requests.getEstimatesAsync({
  "product_id": query.product_id,
  "startAddress": '1412 Market St, San Francisco, CA 94103, US',
  "endAddress": query.destination
  })
  .then(function(resp) {
    res.send(resp);
  })
  .error(function(err) {
    console.error("could not get estimates", err);
  });
})

router.get('/delete', function(req, res) {
  uber.requests.deleteCurrentAsync()
  .then(function(resp) {
      res.send(resp);
  })
  .error(function(err) {
    console.error("could not delete current request", err);
  });
})

router.get('/modify', function(req, res) {
  uber.requests.deleteCurrentAsync()
  .then(function(resp) {
      res.send(resp);
  })
  .error(function(err) {
    console.error("could not modify current request", err);
  });
})

router.get('/current', function(req, res) {
  uber.requests.getCurrentAsync()
  .then(function(resp) {
      res.send(resp);
  })
  .error(function(err) {
    console.error("could not get current request", err);
  });
})



module.exports = router
