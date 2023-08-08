const app = require('./app');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connectDatabase = require('./config/database');

// Handling Uncaught Exception  --> if some unknown variable is called our consoled out
process.on('uncaughtException',(err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the error due to Uncaught Exception`);
    process.exit(1);
});


// config
dotenv.config({path:'backend/config/config.env'});

// connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})


// Unhandled Promise Rejection  --> If some entry is missing in schema or some error is not handled , that's why we removed catch in database.js
process.on("unhandledRejection",(err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });

});