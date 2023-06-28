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
import agenceRoute from "./routes/agenceRoute.js"
import cookieParser from 'cookie-parser';


// data imports
import User from "./models/User.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import Client from "./models/Client.js";
import OverallStatClient from "./models/OverallStatClients.js";
import Agency from "./models/Agence.js";
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
import { agencies } from "./data/dataAgency.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json()); //middleware it takes json data within request and passes into a javascript code
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));


// COOKIES
app.use(cookieParser()) // middleware

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/total", totalRoutes);
app.use("/auth", authRoutes); //any routes defined in authRoutes.js will be accessible under the /auth prefix
app.use("/clients", clientStatRoutes)
app.use("/agencies", agenceRoute)



/* ROUTES WITH FILES */
// app.post("/")




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
    // Client.insertMany(dataClient)

    // OverallStatClient.insertMany(dataOverallStatClient)
    // Agency.insertMany(agencies)
  })
  .catch((error) => console.log(`${error} did not connect`));