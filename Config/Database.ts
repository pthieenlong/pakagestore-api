import mongoose, { ConnectOptions } from "mongoose";
import User from "../Model/User";
require('dotenv').config();
const ConnectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABSE_URI || "mongodb+srv://admin:ULhyWhTX4t0Ow3LC@cluster0.g3gqzke.mongodb.net/NodeTS?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions);
  } catch(error: any) {
    console.error(error)
  }
}
const AddUserRecord = async () => {
  mongoose.connection.db.collection('users').count((err, count) => {
    if(err) return (err);
    else {
      if(count == 0) {
        User.collection.insertMany(require('../Database/admin-account.json'))
          .then(function() {
            console.log("Inserted Admin accounts");
          })
          .catch(function(err) {
            console.log(err);            
          });
      }
    }
  })
}
module.exports = { ConnectDatabase, AddUserRecord };