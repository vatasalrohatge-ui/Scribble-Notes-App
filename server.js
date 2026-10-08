require('dotenv').config({path: './config.env'})
const app = require('./src/app')
const connectDB = require('./src/db/db.js');

app.listen(process.env.PORT || 3000, () =>{
    console.log("server running at localhost:" + (process.env.PORT || 3000))
})
connectDB()
