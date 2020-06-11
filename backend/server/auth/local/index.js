import express from 'express';
var router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../api/user/model';
import config from '../../config/environment';

router.post("/", async (req, res) => {
  var user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: 'Email not registered with us.' });
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
    }
    const token = jwt.sign({ _id: user._id }, config.getConstants().token.secret, { expiresIn: '30d' });
    return res.status(200).json({ token: token, name: user.name });
  }
});

export default router;