
import User from '../models/usersModel.js';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userId = await User.insertUser(name, email, password);
        res.status(201).json({success: true, message: userId});
    } catch(e) {
        console.log(e);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }

};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.loginUser(email, password);
        res.status(200).json({success: true, message: user});
        
    } catch(e) {
        console.log(e);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}
