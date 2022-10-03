import express, { Request, Response } from "express";
import { UserController } from "../../Controller/UserController";
import verifyRole from "../../Middleware/VerifyRole";
import ROLES from "../../Config/Roles";
const router = express.Router();
const userController = new UserController();

router.route('/')
    .get(verifyRole(ROLES.ADMIN), userController.getAllUser)
    .post(verifyRole(ROLES.ADMIN), userController.createUser)
    .put(verifyRole(ROLES.ADMIN), userController.updateUserForAdmin)
    .delete(verifyRole(ROLES.ADMIN), userController.deleteUser);
router.route('/:username')
    .get(verifyRole(ROLES.USER), userController.getUserByUsername)
    .put(verifyRole(ROLES.USER), userController.updateUser);
export = router;
module.exports = router;