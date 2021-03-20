import { allRoles } from "../models/Role";

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!allRoles.includes(req.body.roles[i]))
        return res.json(`Role ${req.body.roles[i]} does not exists`);
    }
  }
  next();
};
