const mongoose = require('mongoose')

async function connectDB() {
    try {

        await mongoose.connect(process.env.CONN_URI);
        console.log(`Database connected succesfully.`)
    } catch (err) {
        console.log(`Database hasn't connected, the error is: ${err}`)
    }
}

module.exports = connectDB