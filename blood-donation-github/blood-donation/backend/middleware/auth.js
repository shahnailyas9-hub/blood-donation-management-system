const jwt = require("jsonwebtoken");

// Verifies the "Authorization: Bearer <token>" header and attaches
// the decoded user payload to req.user
function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

// Restricts a route to one or more roles, e.g. requireRole("Admin")
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied for this role." });
    }
    next();
  };
}

module.exports = { verifyToken, requireRole };
