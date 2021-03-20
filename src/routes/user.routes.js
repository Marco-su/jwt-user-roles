import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { verifyToken, isAdmin } from "../middlewares/auhtjwt";
import { checkRolesExisted } from "../middlewares/verifyRegister";

const router = Router();

router.post("/", [verifyToken, isAdmin, checkRolesExisted], createUser);

export default router;
