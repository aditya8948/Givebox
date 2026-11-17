const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models');
const { where } = require('sequelize');

// helper to generate jwt token

const generateToken = (user) =>{
    return jwt.sign(
        {id: user.id, email: user.email, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
};


// POST API/auth/register

exports.register = async(req, res)=>{
    try {
        const {full_name, email, password, role} = req.body;

    if(!full_name || !email || !password){
      return res.status(400).json({ error: 'Full name, email, and password are required.' });      
    }

    const existingUser = await User.findOne({where :{email}});
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }
    
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user 

    const userRole = role === 'charity' ? 'charity' : 'donor';

    const user = await User.create({
        full_name,
        email,
        password: hashedPassword,
        role: userRole
    });


    const token = generateToken(user);

    return res.status(201).json({
        message: 'User registered successfully',
        user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
    },
      token
    })
    } catch (error) {
         console.error('Registration error:', error);
         return res.status(500).json({ error: 'Internal server error' });
    }
};


// POST /API/auth/login

exports.login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        
        const user = await User.findOne({where: {email}});
        if(!user){
            return res.status(401).json({error: 'invalid email'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
          return res.status(401).json({ error: 'Invalid email or password.' });
        }


        const token = generateToken(user);

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

//GET /API/auth/profile(protected)

exports.getProfile = async (req, res)=>{
    try {
        return res.status(200).json({user: req.user});
    } catch (error) {
        return res.status(500).json({error: 'Internal server error'});
    }
}

// PUT /API/auth/profile (protected )

exports.updateProfile = async(req, res)=>{
    try {
        const {full_name} = req.body;
        const user = await User.findByPk(req.user.id);

        if(full_name){
            user.full_name = full_name;
            await user.save();
        }
        return res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
  }
};