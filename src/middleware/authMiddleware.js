const jwt = require('jsonwebtoken');
const {User} = require('../models');


const authenticate = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({error: 'Access denied. No token provided'});
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id, {
            attributes: ['id', 'full_name', 'email', 'role']
        });

        if(!user){
            return res.status(401).json({error: 'Invalid token. User not found'});
        }

        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({error: 'Invalid or token expired '});
    }

};

const authorize = (...roles) =>{
    return (req, res, next)=>{
        if(!req.user || !roles.includes(req.user.role)){
            return res.status(403).json({error: 'Access forbidden: Unauthoried request'});
        }
        next();
    }
}

module.exports = {
    authenticate,
    authorize
}