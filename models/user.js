
// ---------- User Schema under construction --------------


// const { MongoClient } = require("mongodb");
// const nconf = require('nconf');

// const uri = nconf.get("mongodb");

// // client-- New instance of the class 
// const client = new MongoClient(uri);

// const userModel = client.db("TheBurgerDatabase").createCollection("Users", {
//     validator: {$jsonSchema: {
//         bsonType: "object",
//         required: ["username", "password", "email"],
//         properties: {
//             username : {
//                 bsonType: "String",
//                 description: "required and must be a string"
//             },
//             password: {
//                 bsonType: "String",
//                 description: "required and must be a string"
//             } 
//         }
//     }
//     }
// });

// module.exports = userModel;