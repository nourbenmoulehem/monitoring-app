import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import totalRoutes from "./routes/total.js";
import authRoutes from "./routes/authRoutes.js";
import clientStatRoutes from "./routes/ClientsStatRoutes.js";
import agenceRoute from "./routes/agenceRoute.js";
import cookieParser from 'cookie-parser';
import chequierRoute from "./routes/chequierRoute.js";
import creditRoute from "./routes/creditRoute.js";
import virementRoute from "./routes/virementRoute.js";
import userRoute from "./routes/userRoute.js";
import eventsRouter from "./routes/eventsRouter.js";
import http from "http"; // Import the 'http' module
import jwt from "jsonwebtoken";
import { WebSocketServer } from 'ws';
import chatRoutes from "./routes/chatRoutes.js"

// data imports
import User from "./models/User.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import Client from "./models/Client.js";
import OverallStatClient from "./models/OverallStatClients.js";
import Agency from "./models/Agence.js";
import Virement from "./models/Virement.js";
import Chequier from "./models/Chequier.js";
import Credit from "./models/Credit.js";
import Message from "./models/Message.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
  dataClient,
  dataOverallStatClient
} from "./data/index.js";
import { agencies, sampleVirements, sampleChequiers, dataCredits } from "./data/dataAgency.js";
import { log } from "console";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/total", totalRoutes);
app.use("/auth", authRoutes);
app.use("/clients", clientStatRoutes)
app.use("/agencies", agenceRoute)
app.use("/chequiers", chequierRoute)
app.use("/credits", creditRoute)
app.use("/virements", virementRoute)
app.use("/users", userRoute)
app.use("/events", eventsRouter)
app.use("/chats", chatRoutes)



// Initialize HTTP server
const server = app.listen(4001);

// Initialize WebSocket server
const wss = new WebSocketServer({ server, perMessageDeflate: false }); // Use WebSocket from 'ws'

// WebSocket connection handling (rest of your code remains the same)
wss.on('connection', (connection, req) => {

  // read every user connected and take its userid from jwt token
  const cookies = req.headers.cookie;
  let id, token; // Initialize id and token as undefined or null

  if (cookies) {
    const cookieArray = cookies.split(';');

    for (const cookie of cookieArray) {
      [id, token] = cookie.trim().split('=');
    }

    // Now, you can use 'id' and 'token' outside the loop
    if(token){
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
        if (err) throw err;
        const userId = userData._id;

        connection.userId = userId

      })
      
    }
  }

  

  // console.log([...wss.clients].map(client => client.userId)); //transformed into an array
  // notify everyone about connected user
  [...wss.clients].map(client =>{
    client.send(JSON.stringify({
      online : [...wss.clients].map(c => ({userId: c.userId}))
    }));
  });


  connection.on('message', async (message) => {
    const messageData = JSON.parse(message.toString())
    const {recipient, text} = messageData.message;
    if(recipient && text){
      //one user can use many devices

      //adding the message to the database
      const messageDoc = await Message.create({
        sender: connection.userId,
        recipient,
        text
      });
      console.log("🚀 ~ file: index.js:131 ~ connection.on ~ messageDoc:", messageDoc);

      [...wss.clients]
        .filter(client => client.userId === recipient) 
        .forEach(client => client.send(JSON.stringify({
          text, 
          sender: connection.userId,
          recipient,
          id: messageDoc._id
        }))) //connection fiha userId mtaa sender
    }
  })
  

});

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
    // Client.insertMany(dataClient);
    // OverallStatClient.insertMany(dataOverallStatClient);
    // Agency.insertMany(agencies);
    // Virement.insertMany(sampleVirements);
    // Chequier.insertMany(sampleChequiers);
    // Credit.insertMany(dataCredits);
    
  })
  .catch((error) => console.log(`${error} did not connect`));
