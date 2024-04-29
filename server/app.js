require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const bodyParser = require('body-parser')
const cookiParser = require("cookie-parser")
const port = 8010;
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const servicesController = require("./routes/servicesController");
const adminController = require("./routes/adminController")


// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))



app.get('/hello', (req, res) => {
    return res.send('Hello')
})


app.post('/api/services', upload.single('image'), servicesController.addServices)
app.get('/api/services', servicesController.getServices)
app.get('/api/slider', servicesController.getSlider)

app.get('/admin/admins', adminController.getAdmins)
app.post('/admin/add', adminController.addAdmins)
app.post('/admin/login', adminController.loginAdmin)





app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})