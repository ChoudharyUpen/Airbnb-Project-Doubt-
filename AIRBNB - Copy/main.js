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
app.use(express.urlencoded({extended:true}));
// -----------------------------------------------------------------------
app.get("/", (req, res) => {
    res.send("hi,I am root");
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts from the database
        res.render("index.ejs", { posts});
    } catch (err) {
        res.status(500).send('Error fetching posts');
    }
});


app.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        // Convert string ID to mongoose ObjectId
        const post = await Post.findById(postId);
        if (post) {
            res.render('individual.ejs', { post });
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        res.status(500).send('Error fetching post');
    }
});

app.listen(8080, () => {
    console.log("Server is listenig to port 8080");
});