const mongoose = require('mongoose');

const connectDatabase = ()=>{
    main();
    // main().catch((err) => {
    //     console.log(err);
    // });
} 

async function main(){
    await mongoose.connect(process.env.DB_URI);
    console.log(`database connected successfully`);
}

module.exports = connectDatabase