import stripe from "stripe";

const stripeClient = stripe("");

export const createCheckout = async (req, res) => {

    try {
        const session = await stripeClient.checkout.sessions.create({
          line_items:  req.body.items.map((item) => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [item.img]
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
        }

}
