require(`dotenv`).config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on(`error`, (error) => console.log(error));
db.once(`open`, () => console.log(`Connected to Database`));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const userRoutes = require(`./routes/user`);
app.use(`/user`, userRoutes);

app.listen(3000, () => console.log("Server Started"));
