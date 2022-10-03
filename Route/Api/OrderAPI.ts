import express, { Response, Request } from "express";
import { OrderController } from "../../Controller/OrderController";
import verifyJWT from "../../Middleware/VerifyJWT";
const router = express.Router();
const orderController = new OrderController();

router.route('/')
    .get(orderController.getOrder)
    .post(orderController.addItem)
    .patch(orderController.updateItem)
    .delete(orderController.deleteItem);

router.route('/:owner')
    .get(verifyJWT, orderController.getOrderOfOwner)
    .post(verifyJWT, orderController.createOrder)
    .patch(verifyJWT, orderController.updateOrder)
    .delete(verifyJWT, orderController.deleteOrder)
export = router;
module.exports = router;