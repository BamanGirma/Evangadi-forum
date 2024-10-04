require('dotenv').config()
const express = require('express');
const app = express();
const port = 5500;

// cors
const cors = require('cors');
app.use(cors());
// db connection
const dbConnection = require('./db/dbConfig')

// json middleware to extract json data
app.use(express.json())






// user routes middleware file
const userRoute = require("./route/userRoute")
// question routes middleware file
const questionsRoute = require("./route/questionRoute");
// authentication middleware file
const authMiddleware = require('./middleware/authMiddleware');

// user routes middleware
app.use("/api/users",userRoute);

// question routes middleware
app.use("/api/questions",authMiddleware,questionsRoute)
// answer routes middleware

async function start(){
    try {
        const result = await dbConnection.execute("select 'test'")
        app.listen(port);
        console.log("database connection established");
        console.log(`listening on port ${port}`);
        // console.log(result);
    } catch (error) {
        console.log(error.message);
    }

}
start();

























