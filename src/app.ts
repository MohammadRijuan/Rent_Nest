import express, {type Application, type Request, type Response } from "express";
import cors from "cors"
import config from "./config";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/auth/auth.route";
import { landlordRoutes } from "./modules/landlord/landlord.route";
import { categoryRoutes } from "./modules/category/category.route";
import { getAllRoutes } from "./modules/getAll/getAll.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { getPaymentRoutes } from "./modules/payments/payment.route";



const app : Application = express();


// using cors so that deployment url can take it automatically
app.use(cors({
    origin: config.app_url,
    credentials: true,
})
);


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


// all api
app.use("/api/auth",authRoutes)

app.use("/api/landlord",landlordRoutes)

app.use("/api/category",categoryRoutes)

app.use("/api/admin",adminRoutes)

app.use("/api",getAllRoutes)

app.use("/api/payments",getPaymentRoutes)


app.use("/",(req:Request,res:Response)=>{
    // res.send("Hello mama ki obosta ...server er initial setup kore felsi")
    res.json({
        success:true,
        message:"Hello mama ki obosta ...server er initial setup kore felsi"
    })
})


export default app;