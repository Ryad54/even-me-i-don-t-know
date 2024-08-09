require('dotenv').config();

const app = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const postRoutes = require("./routes/post.js");
const { default: mongoose } = require('mongoose');



app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/posts',postRoutes);

const connectdb = process.env.DATABASE_URL;
const Port = process.env.PORT || 3000;

mongoose.connect(connectdb,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> app.listen(Port,()=>console.log(`server is running on ${Port}`)))
    .catch(err=>console.log(err));



mongoose.set("useFindAndModify", false);