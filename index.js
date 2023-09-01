const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
require('dotenv').config();
const app = express();
const client = require('twilio')(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  await axios
    .get(
      'https://talep.citroen.com.tr/elektrikli-araclar/app/Home/GetParamsV2?modelCode=astra-e'
    )
    .then((response) => {
      return response.data.reservation_available_color;
    })
    .then((data) => {
      for (let item of data) {
        if (item.color === 31 && item.available === true) {
          client.messages
            .create({
              body: 'MAVİ RENK AÇILDI',
              messagingServiceSid: 'MG9ee3b92b47f6a6b10ef53dc1f00b620b',
              to: '+905322709080',
            })
            .then((message) => console.log(message.sid))
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ message: 'error' });
            });
        }
      }
      res.status(200).json({ message: 'success' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'error' });
    });
});

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.listen(process.env.PORT, () => {
  console.log('Server listening on port 8000');
});
