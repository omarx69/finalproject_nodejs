require('dotenv').config();

const isSuperAdmin = (req, res, next) => {
  const email = req.user?.email;

  if (!email) {
    return res.status(401).json({ message: "Unauthorized: No email in token" });
  }

  const superAdmins = process.env.SUPERADMIN_EMAILS?.split(',') || [];

  if (superAdmins.includes(email)) {
    return next(); // ✅ Authorized
  }

  return res.status(403).json({ message: "Access denied: Superadmin only" });
};

module.exports = isSuperAdmin;
