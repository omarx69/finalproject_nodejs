const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// secret key for jwt
const SECRET_KEY = '0c5f477d11ad6c89c3cbf9782970dda2';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send("Error retrieving users");
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Failed retrieving the userId:", req.params.userId);
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// const addUser = async (req, res) => {
//     try {
//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         });
//         await newUser.save();
//         res.json(newUser);
//     } catch (error) {
//         res.status(500).json({ message: 'Error adding user' });
//     }
// };

const patchUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Failed updating the user:", req.params.userId);
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Failed deleting the user:", req.params.userId);
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if(!username || !email || !password){
      res.status(400).json({message: "username, email and password are required"})
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ username, email, hashedPassword});
    await newUser.save();

    
  const token = jwt.sign({id: user.id, username:user.username } ,SECRET_KEY ,{
    expiresIn: '1h'
  });

  return res.status(201).json({token});


    // res.status(201).json({
    //   message: "User registered successfully",
    //   user: {
    //     id: newUser._id,
    //     username: newUser.username,
    //     email: newUser.email,
    //   },
    // });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
  
  
};


const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.find({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Signin successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Server error during signin" });
  }

  const token = jwt.sign({id: user.id, username:user.username } ,SECRET_KEY ,{
    expiresIn: '1h'
  });
  return res.json({token});
};


module.exports = {
  getAllUsers,
  getUserById,
  patchUser,
  deleteUser,
  signup,
  signin,
};
