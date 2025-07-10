const isAdmin = (req, res, next) => {
    if (!req.user || req.user.email !== ADMIN_EMAIL) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

module.exports = isAdmin;