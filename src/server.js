import dotenv from "dotenv";
import express from "express";
// import {somme, substr, div, multip} from "./calc.js";
import connectDB from "./config/db.js";
import users from "./users.json" assert { type: "json" };

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello! u r IN MARKHI's server");
});

app.get("/about", (req, res) => {
  res.send("About Express");
});

// // sum
// app.get("/somme/:a/:b", (req, res) => {
//   const a = parseInt(req.params.a);
//   const b = parseInt(req.params.b);
//   res.send(`Result of ${a} and ${b} is ${somme(a, b)} `);
// });

// // sub
// app.get("/sub/:a/:b", (req, res) => {
//   const a = parseInt(req.params.a);
//   const b = parseInt(req.params.b);
//   res.send(`Result of ${a} mince ${b} is ${substr(a, b)} `);
// });

// // mult 
// app.get("/mult/:a/:b", (req, res) => {
//   const a = parseInt(req.params.a);
//   const b = parseInt(req.params.b);
//   res.send(`Result of ${a} x ${b} is ${multip(a, b)} `);
// });

// div
// app.get("/div/:a/:b", (req, res) => {
//   const a = parseInt(req.params.a);
//   const b = parseInt(req.params.b);
//   res.send(`Result of ${a} divided by ${b} is ${div(a, b)} `);
// });

/*
app.get("/:nom", (req, res) => {
  res.send(`Hello ${req.params.nom} !`);
});

*/

//GET ALL USERS
app.get("/users", (req, res) => {
  res.json(users);
});

//get users 
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  res.json(user);
});



connectDB();

app.listen(8000, "0.0.0.0", () => {
  console.log("Server running on port 8000");
});

//POST
app.post("/users", (req, res) => {
  users.push(req.body);
  res.json(users);
});


//PUT
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  user.name = req.body.name;
  user.country = req.body.country;
  res.json(users);
});

//DELETE
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);
  users.splice(index, 1);
  res.json(users);
});