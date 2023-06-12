import userForm from "../model/model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "secret";

export const signup = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    const oldModel = await userForm.findOne({ email });

    if (oldModel) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await userForm.create({
      email,
      password: hashedPassword,
      name: `${firstname} ${lastname}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await userForm.findOne({ email });

    if (!oldUser) {
      return res.status(404).json({ message: "User not Found" });
    }

    const checkPassword = await bcrypt.compare(password, oldUser.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
