import React from 'react';
import Uber from 'node-uber';

var uber = new Uber({
  client_id: process.env.UBER_CLIENT_ID,
  client_secret: process.env.UBER_CLIENT_SECRET,
  server_token: process.env.UBER_SERVER_TOKEN,
  redirect_uri: 'http://localhost:3000',
  name: 'IRIS',
  language: 'en_US', // optional, defaults to en_US
  sandbox: true // optional, defaults to false
});

app.get('/api/login', function(request, response) {
  var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
  response.redirect(url);
});

app.get('/api/callback', function(request, response) {
   uber.authorizationAsync({authorization_code: request.query.code})
   .spread(function(access_token, refresh_token, authorizedScopes, tokenExpiration) {
     // store the user id and associated access_token, refresh_token, scopes and token expiration date
     console.log('New access_token retrieved: ' + access_token);
     console.log('... token allows access to scopes: ' + authorizedScopes);
     console.log('... token is valid until: ' + tokenExpiration);
     console.log('... after token expiration, re-authorize using refresh_token: ' + refresh_token);

     // redirect the user back to your actual app
     response.redirect('/web/index.html');
   })
   .error(function(err) {
     console.error(err);
   });
});
