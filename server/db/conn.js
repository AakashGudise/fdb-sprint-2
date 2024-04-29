const mongoose = require("mongoose");

const DB = 'mongodb+srv://gudisheakash:gudisheakash@cluster0.3p36pes.mongodb.net/fdb'
//process.env.DATABASE
mongoose.connect(DB, { 
    useUnifiedTopology: true,
    useNewUrlParser: true 
}).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.error("Error connecting to database:", err);
});

// mongoose.connect(DB,{
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }).then(()=> console.log("DataBase Connected")).catch((errr)=>{
//     console.log(errr);
// })

//   mongodb+srv://gudisheakash:Aakash@33909@cluster0.ddpn4i9.mongodb.net/fdb?retryWrites=true&w=majority&appName=Cluster0