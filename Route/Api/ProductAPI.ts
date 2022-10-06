import express, { Request, Response } from "express";
import ROLES from "../../Config/Roles";
import { ProductController } from "../../Controller/ProductController";
import verifyJWT from "../../Middleware/VerifyJWT";
import verifyRole from "../../Middleware/VerifyRole";
const router = express.Router();
const productController = new ProductController();

router.route('/')
    .get(productController.getAllProducts)
    .post(verifyJWT, verifyRole(ROLES.ADMIN), productController.createProduct)
    .put(productController.updateProduct)//verifyJWT, verifyRole(ROLES.ADMIN), productController.updateProduct)
    .delete(verifyJWT, verifyRole(ROLES.ADMIN), productController.deleteProduct);
router.route('/:id').get(productController.getProduct);

export = router;
module.exports = router;