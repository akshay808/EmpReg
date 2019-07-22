const jwt = require('jsonwebtoken');
const Emp = require('../models/emp');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisismynewcourse');
    const emp = await Emp.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!emp) {
      throw new Error();
    }

    req.emp = emp;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
