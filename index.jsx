const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Success !",
	});
});

app.post("/payment/create", async (req, res) => {
	const total = req.query.total;

	if (total) {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: total,
			currency: "usd",
		});
		console.log(paymentIntent);
		res.status(201).json({
			clientSecret: paymentIntent.client_secret,
		});
		// console.log("payment recieved", total);
		// res.send(total);
	} else {
		res.status(403).json({
			message: "total must be greater than 0",
		});
	}
});


app.listen(5000, (err)=>{
    if(err) throw err
    console.log("Amazon ServerRuning on Port: 5000, http://localhost:5000")
})