const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = '0c5f477d11ad6c89c3cbf9782970dda2';

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(req.headers);
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }
    console.log(token);    
    req.user = user;
    next();


  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;
