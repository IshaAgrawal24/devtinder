require('dotenv').config({path: "./.env"})
const connectDB = require('./src/config/database');
const app = require('./src/app')

const PORT = process.env.PORT;

connectDB();

app.listen(PORT,() => {
    console.log(`Server has created at PORT: ${PORT}`)
} ) 