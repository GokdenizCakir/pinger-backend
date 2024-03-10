const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const client = require('twilio')(
  'ACe898c8cbe12ebbc107380fb6a626befe',
  'c0fe4907c64a345d84518efcd87b033d'
);

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  // Add an authorization header with the value of the token

  const response = await fetch(
    'https://ticketingweb.passo.com.tr/api/passoweb/getavailableblocklist?eventId=6231334&serieId=&seatCategoryId=7341461',
    {
      body: null,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer DHZHUMUdA8HUDTlgRWfY+s0KGNYpmPEYGyVinAenPkIPzJlbP6cgwBWoRK15INXUnHSjw70ukEEtE8vhHRlgWLXnWMyVn8gTz5YeteZ+dUzqNsUWxitAaHrh+A9AU7ABA8YL2s/b/bRUeg//9OdGmBnscyuJ0zerXbOzvFRDoss=',
        'Set-Cookie':
          'TS014d1c97=01de2447c6bbdeeb298d0fa41e67c0943f19f2f7c90a7791db90c78c3809e442aad295fbb18265f1422740e2e141130ad3f5c8935a; Path=/; Domain=.ticketingweb.passo.com.tr',
      },
    }
  );

  const data = await response.json();

  if (data?.totalItemCount > 0) {
    const message = await client.messages.create({
      body: 'FB MAÇI',
      from: '+1 727 288 9005',
      to: '+905322709080',
    });

    console.log(message.sid);
  }

  res.status(200).json(data);
});

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
