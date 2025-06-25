import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from "../controllers/rootControllers.js";

const rootRouter = express.Router();

// All routes are prefixed with /users
rootRouter.get("/", getUsers);

rootRouter.get("/:id", getUser);

rootRouter.post("/", createUser);

rootRouter.put("/:id", updateUser);

rootRouter.delete("/:id", deleteUser);

export default rootRouter;
