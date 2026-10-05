"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = require("./modules/auth/auth.route");
const landlord_route_1 = require("./modules/landlord/landlord.route");
const category_route_1 = require("./modules/category/category.route");
const getAll_route_1 = require("./modules/getAll/getAll.route");
const admin_route_1 = require("./modules/admin/admin.route");
const payment_route_1 = require("./modules/payments/payment.route");
const notFound_1 = require("./middlewares/notFound");
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const app = (0, express_1.default)();
// using cors so that deployment url can take it automatically
app.use((0, cors_1.default)({
    origin: config_1.default.app_url,
    credentials: true,
}));
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// all api
app.use("/api/auth", auth_route_1.authRoutes);
app.use("/api/landlord", landlord_route_1.landlordRoutes);
app.use("/api/category", category_route_1.categoryRoutes);
app.use("/api/admin", admin_route_1.adminRoutes);
app.use("/api", getAll_route_1.getAllRoutes);
app.use("/api/payments", payment_route_1.getPaymentRoutes);
app.use("/", (req, res) => {
    // res.send("Hello mama ki obosta ...server er initial setup kore felsi")
    res.json({
        success: true,
        message: "Hello mama ki obosta ...server er initial setup kore felsi"
    });
});
// not found middleware
app.use(notFound_1.notFound);
// global error middleware
app.use(globalErrorHandler_1.golbalErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map