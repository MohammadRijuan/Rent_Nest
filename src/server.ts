import app from "./app"
import config from "./config";
import { prisma } from "./lib/prisma";


const PORT = config.port;

async function main () {
    try {
         
        // connecting the database
        await prisma.$connect();
        console.log("Connected to the database")

        app.listen(PORT,()=>{
            console.log(`Rent Nest is running on server : ${PORT}`)

        })
        
    } catch (error) {
        console.log(`errors are : ${error}`)

        await prisma.$disconnect();
        process.exit(1)
    }
}


main()