require('dotenv').config();

const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.email) {
        return res.status(401).json({ message: 'Unauthorized: no email found' });
    }

    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];

    if (!adminEmails.includes(req.user.email)) {
        return res.status(403).json({ message: 'Admin access required' });
    }

    next();
};

module.exports = isAdmin;
