const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const client = require('twilio')(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const res = await fetch(
      'https://talep.citroen.com.tr/elektrikli-araclar/app/Home/GetParamsV2?modelCode=astra-e'
    );
    const data = await res.json();
    for (let item of data.reservation_available_color) {
      if (item.color === 31) {
        client.messages
          .create({
            body: 'MAVİ RENK AÇILDI',
            messagingServiceSid: 'MG9ee3b92b47f6a6b10ef53dc1f00b620b',
            to: '+905322709080',
          })
          .then((message) => console.log(message.sid))
          .catch((err) => console.log(err));
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/ping', (req, res) => {
  res.status(200).json({message:'pong'});
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
