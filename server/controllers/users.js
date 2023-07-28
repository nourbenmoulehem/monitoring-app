import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    console.log('hiiiiiiii')
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id, firstName, lastName, location, occupation, agency, email, phoneNumber } = req.body;

    // Check if the _id is provided
    if (!_id) {
      return res.status(400).json({ error: 'User ID (_id) is required' });
    }

    // Construct the update object with the fields to be updated
    const update = {
      fName: firstName,
      lName: lastName,
      location,
      occupation,
      agency,
      email,
      phoneNumber
    };
    console.log("🚀 ~ file: users.js:33 ~ updateUser ~ update:", update)

    // Find the user by _id and update the fields
    const updatedUser = await User.findByIdAndUpdate(_id, update, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Corrected to req.params.id
    console.log("🚀 ~ file: users.js:53 ~ deleteUser ~ id:", id)

    // Check if the ID is provided
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};







