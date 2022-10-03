import express, {Request, Response} from "express";
import { RegisterController } from "../Controller/RegisterController";
const registerController = new RegisterController();
const router = express.Router();
router.post('/', registerController.register);

export = router;
module.exports = router;