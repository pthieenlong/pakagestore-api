import express, {Application, Response, Request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import verifyJWT from "./Middleware/VerifyJWT";
const Database = require('./Config/Database');

require("dotenv").config();

const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Database.ConnectDatabase();

app.use(cookieParser());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Hello"
    });
})
app.use('/register', require('./Route/RegisterRoute'));
app.use('/login', require('./Route/LoginRoute'));
app.use('/refresh', require('./Route/RefreshRoute'));
app.use('/product', require('./Route/Api/ProductAPI'));
app.use('/cart', require('./Route/Api/OrderAPI'));
app.use(verifyJWT);
app.use('/user', require('./Route/Api/UserAPI'));

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}); 