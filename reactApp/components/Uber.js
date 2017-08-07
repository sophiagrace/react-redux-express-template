import React from 'react';
import Uber from 'node-uber';

class Uber extends React.Component {
  constructor() {
    super();
    this.state = {
      interval: () => '',
    };
  }
  componentDidMount() {
      var uber = new Uber({
      client_id: process.env.UBER_CLIENT_ID,
      client_secret: process.env.UBER_CLIENT_SECRET,
      server_token: process.env.UBER_SERVER_TOKEN,
      redirect_uri: 'http://localhost:3000',
      name: 'IRIS',
      language: 'en_US', // optional, defaults to en_US
      sandbox: true // optional, defaults to false
    });

  }
}
