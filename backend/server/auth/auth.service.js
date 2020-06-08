import jwt from 'jsonwebtoken';

export function isLoggedin() {
    return function(req,res, next){
        const token = req.header('token');
        if(!token){
            return res.status(401).send({ message: 'Access forbidden.' });
        }
        try {
            const user = jwt.verify(token,process.env.TOKEN_SECRET);
            req.user = user;
            if(user.status != 'active') {
                return res.status(403).send({ message: 'Access forbidden.' });
            }
            next()
        } catch(err){
           return res.status(400).send({ message: 'Invalid session. Please login again.' });
        }
    }
}