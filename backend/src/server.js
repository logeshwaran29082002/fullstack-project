require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.use(express.json());

// connect to mongodb

mongoose.connect(process.env.DB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Database is Connected Sucessfully')
})
.catch((err)=>{
    console.log('MongoDb Connection Error',err)
});

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
    
})