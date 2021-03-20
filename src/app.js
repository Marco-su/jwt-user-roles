//---Imports
import express from "express";
import morgan from "morgan";

import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";
import { createRoles } from "./libs/initialSetup";

//---Initialization
const app = express();
createRoles();

//---Middlewares
app.use(morgan("dev"));
app.use(express.json());

//---Routes
app.use("/products", productsRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

//---Export
export default app;
