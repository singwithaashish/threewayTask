import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    const { name, isManufacturer, email, password } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, isManufacturer, email, password: hashedPassword });
    await user.save();

    res.status(200).json({ message: 'User registered successfully' });
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    if (!token) return res.status(500).json({ message: 'Internal Server Error' });

    res.status(200).json({ token });
}


export const me = async (req: Request, res: Response) => {
    try {
        const user = req.user.toObject();
        delete user.password;
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
