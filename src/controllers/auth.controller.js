import jwt from "jsonwebtoken";

import User from "../models/User";
import Role from "../models/Role";
import config from "../config";

//---Register
export const register = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });

  if (userFound) return res.json("This email is already in use");

  const { username, email, password, roles } = req.body;

  //Crear usuario nuevo
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  //Mandar token
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token });
};

//---Login
export const login = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );

  if (!userFound) return res.json("User not found");

  //comparar contraseña
  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword) return res.json("Invalid password");

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token });
};
