import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const stripe = new Stripe("sk_test_51Pwxxxxxxx"); // Replace with Stripe Secret Key

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { line_items } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: line_items,
      success_url: "https://YOURDOMAIN.com/success.html",
      cancel_url: "https://YOURDOMAIN.com/cancel.html"
    });

    res.send({ id: session.id });

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));
