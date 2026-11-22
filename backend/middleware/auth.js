const jwt = require('jsonwebtoken');

function authenticateAdmin(req, res, next) {
  try {
    const authorization = req.headers.authorization || '';

    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'AUTHENTICATION_REQUIRED'
      });
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        error: 'AUTHENTICATION_REQUIRED'
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('[AUTH] JWT_SECRET is not configured.');

      return res.status(500).json({
        error: 'AUTHENTICATION_NOT_CONFIGURED'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (
      decoded.role !== 'admin' ||
      !decoded.userId ||
      !decoded.stallId
    ) {
      return res.status(403).json({
        error: 'ADMIN_ACCESS_REQUIRED'
      });
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      stallId: decoded.stallId
    };

    next();
  } catch (error) {
    return res.status(401).json({
      error: 'INVALID_OR_EXPIRED_TOKEN'
    });
  }
}

module.exports = {
  authenticateAdmin
};