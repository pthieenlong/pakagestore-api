import express, { Response, Request } from "express";
import { OrderController } from "../../Controller/OrderController";
import verifyJWT from "../../Middleware/VerifyJWT";
const router = express.Router();
const orderController = new OrderController();

router.route('/')
    .get(orderController.getOrders)
    .post(orderController.addItem)
    .patch(orderController.updateItem)
    .delete(orderController.deleteItem);

router.route('/:owner')
    .get(orderController.getAllOrdersOfOwner)
    .post(orderController.createOrder)
    .patch(orderController.updateOrder)
    .delete(orderController.deleteOrder)
router.route('/:owner/checkout')
    .post(orderController.checkOut);
export = router;
module.exports = router;