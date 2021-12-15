const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let startTime = new Date();

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  const current_date = new Date();

  const heartbeat_rate = randomNumber(50, 200);
  const temperature = randomNumber(0, 40);
  const humidity = randomNumber(0, 100);

  let diff = Math.round((current_date - startTime) / 1000);
  const seconds = diff % 60;
  diff = Math.floor(diff / 60);
  const minutes = diff % 60;
  diff = Math.floor(diff / 60);
  const hours = diff;

  const uptime = `${hours}:${minutes}:${seconds}`;

  const responseString = `${uptime} ${heartbeat_rate} ${temperature} ${humidity}`;
  res.header("Content-Type", "text/plain");
  res.send(responseString);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
