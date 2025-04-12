const jwt = require('jsonwebtoken');

const checkAuth = (req, res) => {
    const { userToken } = req.body;
    const decoded = jwt.verify(userToken, process.env.SECRET_KEY);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    next();
}
module.exports = {
    checkAuth
}