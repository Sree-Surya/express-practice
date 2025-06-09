const express = require("express");
const port = 3000;

app = express();

var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.get("/", (req, res) => {
  const kidneyOfJohn = users[0].kidneys;
  const numberOfKidneys = kidneyOfJohn.length;
  let numberOfHealthyKidneys = 0;

  for (let i = 0; i < kidneyOfJohn.length; i++) {
    if (kidneyOfJohn[i].healthy) {
      numberOfHealthyKidneys += 1;
    }
  }

  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

app.listen(port, () => {
  console.log("Started server");
});
