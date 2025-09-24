import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            name: name,
            email: email,
            password: hashPassword
        });

        await createdUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email
            }
        });

    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // If user is not found
        if (!user) {
            return res.status(400).json({ message: "Invalid user" });
        }

        // Compare password
        const isMatch = await bcryptjs.compare(password, user.password);

        // If password is incorrect
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // If credentials are correct
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
