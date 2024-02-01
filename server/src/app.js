const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require("body-parser");
const stripe = require("stripe")("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");

const app = express();

app.use(cors())

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/products.router'));

app.use(express.static("public"));

app.set('port', 4242);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//app.use(cors({ origin: true, credentials: true }));



app.post("/checkout", async (req, res, next) =>{
  try {
    const session = await stripe.checkout.sessions.create({
      line_items:  req.body.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.product]
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
       mode: "payment",
       success_url: "http://localhost:4242/success.html",
       cancel_url: "http://localhost:4242/cancel.html",
    });

    res.status(200).json(session);
    }catch (error) {
      next(error);
    }});









module.exports = app;


