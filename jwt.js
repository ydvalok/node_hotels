const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

   //No header
    if (!authorization) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    //  Wrong format
    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid authorization format' });
    }

    // Extract token
    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    //  Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Attach user
    req.user = decoded;

    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// function to generate JWT token
const generateToken = (userdata) => {
  return jwt.sign(userdata, process.env.JWT_SECRET, {
    expiresIn: '30s'
  });
};

module.exports = { jwtAuthMiddleware, generateToken };
