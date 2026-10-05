"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// import config from "./config";
const prisma_1 = require("./lib/prisma");
// const PORT = config.port;
async function main() {
    try {
        // connecting the database
        await prisma_1.prisma.$connect();
        console.log("Connected to the database");
        // app.listen(PORT,()=>{
        //     console.log(`Rent Nest is running on server : ${PORT}`)
        // })
    }
    catch (error) {
        console.log(`errors are : ${error}`);
        await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
}
main();
exports.default = app_1.default;
//# sourceMappingURL=server.js.map