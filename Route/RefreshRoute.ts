import express, {Request, Response} from "express";
import handleRefreshToken from "../Controller/RefreshTokenController";
const router = express.Router();
router.get('/', handleRefreshToken);

export = router;
module.exports = router;