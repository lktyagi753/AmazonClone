require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Products = require('./Products')
const bcrypt = require("bcryptjs");
const Users = require("./User");
const Orders = require("./Orders");
const stripe = require("stripe")(process.env.STRING);
const path = require('path');

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

const connection_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cokfbhy.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => res.status(200).send("Home page"));


app.post("/products/add", (req, res) => {
  const productDetail = req.body;

  console.log("Product Detail >>>>", productDetail);

  Products.create(productDetail).then((data) => {
    res.status(201).send(data);
  })
    .catch((err) => {
      res.status(500).send(err.message);
      console.log(err);
    })
});

app.get('/products/get', (req, res) => {
  Products.find().then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(500).send(err);
  })
})


app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  const encrypt_password = await bcrypt.hash(password, 10);

  const userDetail = {
    email: email,
    password: encrypt_password,
    fullName: fullName,
  };

  const user_exist = await Users.findOne({ email: email });

  if (user_exist) {
    res.send({ message: "The Email is already in use !" });
  } else {
    Users.create(userDetail).then((result) => {
      res.send({ userDetail, message: "User Created Succesfully" });
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    })
  }
});



app.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  const userDetail = await Users.findOne({ email: email });

  if (userDetail) {
    if (await bcrypt.compare(password, userDetail.password)) {
      res.send(userDetail);
    } else {
      res.send({ error: "invaild Password" });
    }
  } else {
    res.send({ error: "user is not exist" });
  }
});

app.post("/payment/create", async (req, res) => {
  const total = req.body.amount;
  console.log("Payment Request received for this amount:", total);

  try {
    const payment = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "inr",
    });

    res.status(201).send({
      clientSecret: payment.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: "An error occurred while creating payment intent." });
  }
});


app.post("/orders/add", (req, res) => {
  const products = req.body.basket;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };

  Orders.create(orderDetail).then((result) => {
    console.log("order added to database >> ", result);
  }).then((err) => { console.log(err); })
});

app.post("/orders/get", (req, res) => {
  const email = req.body.email;
  console.log(email);

  console.log("req received");

  Orders.find().then((result) => {
    const userOrders = result.filter((order) => order.email === email);
    res.send(userOrders);
  }).catch((err) => {
    console.log(err);
  })
});

app.listen(port, () => console.log("listening on the port ", port));