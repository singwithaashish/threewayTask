var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, isManufacturer, email, password, address } = req.body;
    // Check if email already exists
    const existingUser = yield User.findOne({ email });
    if (existingUser)
        return res.status(400).json({ message: 'User already exists' });
    // Hash password
    const hashedPassword = yield bcrypt.hash(password, 10);
    // Create new user
    const user = new User({ name, isManufacturer, email, address, password: hashedPassword });
    yield user.save();
    res.status(200).json({ message: 'User registered successfully' });
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check if user exists
    const user = yield User.findOne({ email }).select('+password');
    if (!user)
        return res.status(400).json({ message: 'Invalid email or password' });
    // Check password
    const validPassword = yield bcrypt.compare(password, user.password);
    if (!validPassword)
        return res.status(400).json({ message: 'Invalid email or password' });
    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    if (!token)
        return res.status(500).json({ message: 'Internal Server Error' });
    res.status(200).json({ token });
});
export const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.toObject();
        delete user.password;
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
