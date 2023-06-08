import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import posts from "./routes/posts.js";
import dotenv from 'dotenv';

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(posts)

// connecting to the MongoDB
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlparser: true, useUnifiedTopology:true})
 .then(() => app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
 .catch((err)=>console.log(err.message));

