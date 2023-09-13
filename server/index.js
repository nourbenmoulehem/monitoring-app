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
app.use("/chequiers", chequierRoute)
app.use("/credits", creditRoute)
app.use("/virements", virementRoute)
app.use("/users", userRoute)
app.use("/events", eventsRouter)



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
    // Client.insertMany(dataClient);
    // OverallStatClient.insertMany(dataOverallStatClient);
    // Agency.insertMany(agencies);
    // Virement.insertMany(sampleVirements);
    // Chequier.insertMany(sampleChequiers);
    // Credit.insertMany(dataCredits);
    
  })
  .catch((error) => console.log(`${error} did not connect`));
