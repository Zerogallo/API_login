require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/User");

const app = express();
app.use(express.json());
//route

app.get("/", (req, res) => {
  res.status(200).json({ msg: "bem vindo!" });
});

//criar usuario
app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirnPassword } = req.boby;
  if (!name) {
    return res.status(422).json({ msg: "O nome e obrigfstorio!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O email e obrigfstorio!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "O password e obrigfstorio!" });
  }
  if (password !== confirnPassword) {
    return res.status(422).json({ msg: "O confirnPassword e obrigfstorio!" });
  }
});

//par nao ter dois email cadastra

const userExists = await User.findOne({ email: email });
if (userExists) {
  return res.status(422).json({ msg: "por favor, utilize outro email!" });
}

//para senha fica mais dificio

const salt = await bcrypt.genSalt(12);
const Passwordhash = await bcrypt.hash(password, salt);

//create user

const user = new user({
  name,
  email,
  password,
});

try {
  await user.save();
  res.status(200).json({ msg: "usuario criado com sucesso!" });
} catch (error) {
  console.log(error);
  res
    .status(500)
    .json({
      msg: "aconteceu um erro no servidor, tente novamente mais tarde!",
    });
}

//connect mongoose
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_DB_SASS;

mongoose
  .connect(
    "mongodb+srv://${dbUser}:${dbPassword}@cluster0.4yiw12v.mongodb.net/"
  )
  .then(() => {
    app.listen(3000);
    console.log("conectou ao banco!");
  })
  .catch((err) => console.log(err));
