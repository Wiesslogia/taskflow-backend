import {registerUser, loginUser} from '../services/auth.service.js';

export const register = async (req, res) => {
    try{
        const user = await registerUser(req.body);
        res.status(201).json ({
            success: true,
            message: 'User registered successfully',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try{
        const data = await loginUser(req.body);
        res.status(200).json ({
            success: true,
            message: 'User logged in successfully',
            user: {
                id: data.user._id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role
            },
            token: data.token
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};