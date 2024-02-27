import express from 'express';
import morgan from 'morgan';
import productsRouter from './routes/products.routes';
import authRouter from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { createRoles } from './libs/initialSetup';
import cors from 'cors';




const app = express();   // Aquí decimos que nuestra aplicación será una aplicación express

const stripe = require("stripe")("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");

createRoles(); // Aquí ejecutamos la función createRoles para crear los roles de usuario en la base de datos

app.use(cors());

app.use(morgan('dev')); // Aquí decimos que nuestra aplicación utilizará el middleware morgan para mostrar los logs en la consola

app.use(express.json()); // Aquí decimos que nuestra aplicación utilizará el middleware express.json para parsear los datos en el body de las solicitudes HTTP

app.use('/api/products', productsRouter);

app.use('/api/auth', authRouter);

app.use('/api/users', userRoutes);

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

export default app
