import User from "../models/User.js";
import Account from "../models/Account.js";

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
  console.log("hello");
  try {
    const { _id, firstName, lastName, location, occupation, agency, email, phoneNumber } = req.body;

    // const cookies = req.headers.cookie;
    // const  token = cookies.split("=")[1];
    // const verified = jwt.verify(token, process.env.JWT_SECRET);


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

    // Find and update the user in the User collection
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, 
      update, 
      { new: true }, 
    );

    // Now update the email in the Account collection
    const accountUpdate = {
      email: email,
    };

    // Find and update the account in the Account collection
    const updatedAccount = await Account.findOneAndUpdate(
      { user: updatedUser._id }, 
      accountUpdate, 
      { new: true }, 
    );

    console.log('User updated:', updatedUser);
    console.log('Account updated:', updatedAccount);

    res.status(200).json({ user: updatedUser, account: updatedAccount });
  } catch (err) {
    console.log("🚀 ~ file: users.js:46 ~ updateUser ~ err:", err)
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
    const deletedAccount = await Account.findOneAndDelete({ user: id });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// search for a user
export const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};
