const app = require('./src/app')
const connectDB = require('./src/db/db.js');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'})
connectDB()

app.listen(process.env.PORT || 3000, () =>{
    console.log("server running at localhost:" + (process.env.PORT || 3000))
})