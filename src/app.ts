import express, {type Application, type Request, type Response } from "express";
import cors from "cors"
import config from "./config";



const app : Application = express();

// using cors so that deployment url can take it automatically
app.use(cors({
    origin: config.app_url,
    credentials: true,
})
);


app.use("/",(req:Request,res:Response)=>{
    // res.send("Hello mama ki obosta ...server er initial setup kore felsi")
    res.json({
        success:true,
        message:"Hello mama ki obosta ...server er initial setup kore felsi"
    })
})


export default app;