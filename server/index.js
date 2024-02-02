
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sendMail = require('./utils/sendMail')
const sendotp = require('./utils/sendotp')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const useotp = require('./models/useotp')
const user = require('./models/user')
const genotp = require('./utils/generateotp');
const multer = require('multer')
const csv = require('csvtojson')
const studentmodel = require('./models/student')
const companiesmodel=require('./models/Companies')
const PORT = process.env.PORT || 8500
app.use(bodyParser.json())
console.log(process.env.NODE_ENV)

connectDB()


app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

 //app.use('/', express.static(path.join(__dirname, 'public')))

// app.use('/', require('./routes/root'))

// app.all('*', (req, res) => {
//     res.status(404)
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'))
//     } else if (req.accepts('json')) {
//         res.json({ message: '404 Not Found' })
//     } else {
//         res.type('txt').send('404 Not Found')
//     }
// })

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage,
})


// mongoose.connection.once('open', () => {
//     console.log('Connected to MongoDB')
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// })

// mongoose.connection.on('error', err => {
//     console.log(err)
    
// })
mongoose.connect(process.env.DATABASE_URI)
.then(res=>{
    console.log("Database Connected Succesfully")
})
.catch(err=>{
    console.log("Error Connecting Database")
})
app.get('/',(req,res)=>{
    res.send("Ready")
})
app.post('/uploadcsv', upload.single("csvFile"), async (req, res) => {
    
    try {
        const up = await csv().fromFile(req.file.path);
        await studentmodel.insertMany(up);
        console.log("Added to Database");
        return res.send("Added to Database Successfully");
    } catch (error) {
        console.error("Error adding data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})
app.get('/viewdata', (req, res) => {
    studentmodel.find()
      .lean()
      .then(students => res.json(students))  
      .catch(error => res.json(error));     
  });
//Companies Routes
app.post('/api/uploadcompanies', upload.single("csvFile"), async (req, res) => {
    
    try {
        const up = await csv().fromFile(req.file.path);
        await companiesmodel.insertMany(up);
        console.log("Added to Database");
        return res.send("Added to Database Successfully");
    } catch (error) {
        console.error("Error adding data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get('/api/companies', (req, res) => {
    companiesmodel.find()
      .lean()
      .then(companies => res.json(companies))  
      .catch(error => res.json(error));     
  });


app.post('/api/sendMail',async(req,res)=>{
    const{email,message,subject} = req.body

    try{
        const sent_to = email
        const sent_from = process.env.EMAIL_USER
        const reply_to = email
        const mailsubject = subject
       
        const textMessage = message
        await sendMail(mailsubject,  textMessage,sent_to, sent_from, reply_to);
        res.status(200).json({success:true,message:"Email sent successfully"})
    }
    catch(err){
        res.status(500).json(err.message)
    }
})
app.post('/api/sendotp',async(req,res)=>{
    const{semail} = req.body
    const aotp = genotp()
    await useotp.create({ email: semail, otp: aotp, createdAt:Date.now() })
    .then(response => console.log(response))
    .catch(err => console.log(err))

    try{
        const sent_to = semail
        const sent_from = process.env.EMAIL_USER
        const reply_to = semail
        const rotp = aotp
        await sendotp(rotp,sent_to, sent_from, reply_to);
        res.status(200).json({success:true,message:"OTP Email sent successfully"})
    }
    catch(err){
        res.status(500).json(err.message)
    }
})
app.post('/api/verifyotp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await useotp.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const storedOtp = user.otp;

        if (otp === storedOtp) {
            // OTP is correct
            await useotp.deleteOne({ email });
            return res.status(200).json({ success: true, message: "OTP verification successful" });
        } else {
            // Incorrect OTP
            return res.status(400).json({ error: "Incorrect OTP" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

