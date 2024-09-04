const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("./models/listing.js");
//ejs ko setup karna k liye hum path ko require kar leta hai
const path=require("path");
// -----------------------------------------------------------------------
app.set('view engine', 'ejs');
app.set("views", path.join (__dirname,"views"));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// -----------------------------------------------------------------------
app.get("/", (req, res) => {
    res.send("hi,I am root");
});


app.get("/posts" , (async (req , res ) => {
    const posts = await Listing.find({});
    res.render("index.ejs", {posts});
  }));

app.listen(8080, () => {
    console.log("Server is listenig to port 8080");
});