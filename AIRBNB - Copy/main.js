const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { data: sampleListings } = require("./init/data");
// -----------------------------------------------------------------------
const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

main().then(() => {
    console.log("connected to db");
})
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(MONGO_URL);
}

const postSchema = new mongoose.Schema({
    id: String, // Changed to String to accommodate UUID
    title: String,
    description: String,
    image: {
        filename: String,
        url: String,
    },
    price: Number,
    location: String,
    country: String,
});

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs'); 
app.use(express.static('public'));
// -----------------------------------------------------------------------
app.get("/", (req, res) => {
    res.send("hi,I am root");
});

app.get("/posts", (req, res) => {
    res.render("index.ejs",  { posts: sampleListings }); 
});

app.get('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('individual.ejs', { post }); 
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(8080, () => {
    console.log("Server is listenig to port 8080");
});