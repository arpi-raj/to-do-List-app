const express = require("express")
const bodyParser = require('body-parser');
const userRouter = require("./backend/routes/user");

const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/user", userRouter)
console.log(typeof userRouter)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});