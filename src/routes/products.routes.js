//---Imports and initializations
import { Router } from "express";
import { verifyToken, isModerator, isAdmin } from "../middlewares/auhtjwt";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProducById,
  deleteProductById,
} from "../controllers/products.controller";

const router = Router();

//---Routes
router
  .route("/")

  .get(getProducts)

  .post([verifyToken, isModerator], createProduct);

router
  .route("/:id")

  .get(getProductById)

  .put([verifyToken, isModerator], updateProducById)

  .delete([verifyToken, isAdmin], deleteProductById);

export default router;
