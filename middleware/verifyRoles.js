const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.sendStatus(401);
    const isAuthorized = allowedRoles.includes(req.role);
    if (!isAuthorized) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
