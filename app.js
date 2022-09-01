const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
// const bodyParser = require('body-parser')

const todoSchema = new mongoose.Schema({
  text: String,
  isCompleted: Boolean,
});

const TODO = new mongoose.model("TODO", todoSchema);

const todo1 = new TODO({
  text: "buy",
  isCompleted: false,
});

const todo2 = new TODO({
  text: "buy1",
  isCompleted: true,
});

const todo3 = new TODO({
  text: "buy3",
  isCompleted: false,
});

const defaultArray = [todo1, todo2, todo3];
// TODO.insertMany(defaultArray);

app.post("/", bodyParser.json(), (req, res) => {
  let item = req.body;
  if (item._id) {
    update(req.body);
  } else {
    const todo = new TODO(req.body);
    todo.save();
  }
  res.send(true);
});

function update(item) {
  TODO.findOneAndUpdate({ _id: item._id }, { $set: { isCompleted: item.isCompleted }}, function(err, result) {
  });
}

app.get("/", function (req, res) {
  const todolist = TODO.find();
  TODO.find({}, function (err, arr) {
    res.json(JSON.stringify(arr));
  });
  // res.json(JSON.stringify(items))
});

// app.get("/", function (req, res) {
//   const date = new Date();
//   var day = date.toLocaleDateString("en-US", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//   });
//   res.render("list", { kindOfDay: day, newItems: items });
// });

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
