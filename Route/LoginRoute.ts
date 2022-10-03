import express, {Request, Response} from "express";
import { LoginController } from "../Controller/LoginController";
const loginController = new LoginController();
const router = express.Router();
router.post('/', loginController.login);

export = router;
module.exports = router;