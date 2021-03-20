import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

//---Verify if there is a valid token
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.json("No token provider");

    const decoded = jwt.verify(token, config.SECRET);
    req.id = decoded.id;

    const userFound = await User.findById(req.id, { password: 0 });

    if (!userFound) return res.json("No user found with this token");

    next();
  } catch (error) {
    res.json("Invalid token");
  }
};

//---Validate moderators
export const isModerator = async (req, res, next) => {
  const userFound = await User.findById(req.id); //El req id viene de la funcion anterior
  const roles = await Role.find({ _id: { $in: userFound.roles } });

  console.log(roles);

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }

  return res.json("Moderator role is required");
};

//---Validate admins
export const isAdmin = async (req, res, next) => {
  const userFound = await User.findById(req.id); //El req id viene de la funcion anterior
  const roles = await Role.find({ _id: { $in: userFound.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  return res.json("Admin role is required");
};
