const mongoose = require('mongoose')
const databaseConnection = async () =>{
  try {
    await mongoose.connect('mongodb://localhost:27017/bookstore').then(()=>{
      console.log('database connection successfully ')
    }).catch((err) =>{
      console.log('databse connection failed',err )
    }); 
    
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = databaseConnection;
