import User from './model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/environment';

export async function create_new_user (req, res) {
    try {
        if(!req.body.name) return res.status(400).json({ message: 'Name is required.' });
        if(!req.body.email) return res.status(400).json({ message: 'E-mail ID is required.' });
        if(!req.body.password) return res.status(400).json({ message: 'Password is required.' });
        let old_user = await User.findOne({ email: req.body.email });
        if(old_user) return res.status(400).json({ message: 'User already exists.' });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        let user = await User.create(req.body);
        const token = jwt.sign({ _id: user._id }, config.getConstants().token.secret, { expiresIn: '30d' });
        return res.status(200).json({ token: token, name: user.name });
    } catch(e) {
        console.log(e);
        return res.status(400).json({ message: 'New user creation failed.' });
    }
}