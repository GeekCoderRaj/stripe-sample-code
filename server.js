const express = require("express");
const app = express();
const cors = require("cors")
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_51Lz2fwSFXlRmJxANBk82cVXjb8bmXQIl6gXusyuaEwtt9hmrZ2Tv7BbFxdexrVZllGrCYlXmZiPVOLoe7M3PH6n000HAJiRta6');

app.use(express.static("public"));
app.use(express.json());
app.use(cors())


app.post("/create-payment-intent", async (req, res) => {
  const { items,amount,address } = req.body;
  console.log(req.body);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));