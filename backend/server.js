require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors")
const passport = require("passport")
const app = express(); 
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send(data)
})

async function initServer() {
    try{
      await mongoose.connect(process.env.DB_URL)

      console.log("connection successful!")
      
      app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
      })

    } catch(err) {
        console.log("connection error!")
        console.log(err)
    }
}

initServer();
