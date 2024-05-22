import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByUsername } from '../models/user.models.js';

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await createUser(username, hashedPassword);

        res.status(201).json({ id: userId, username });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { id, username } = user;
        res.json({ id, username });
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {registerUser,loginUser,getUserProfile}