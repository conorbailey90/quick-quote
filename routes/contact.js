require('dotenv').config()

const express = require('express');
const router = express.Router();

// nodemailer is user to send emails using the data recived from quote form submission.
const nodemailer = require("nodemailer");

router.get('/', (req,res)=>{
    res.render('contact')
})

router.post('/', (req,res)=>{
     // Gmail
     let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
         }
    })

    let mailOptions = {
        from:`${req.body.name} <${req.body.email}>`,
        to: process.env.EMAIL,
        subject: `QUICK QUOTE: Message received from ${req.body.email}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log('Email sent')
            console.log(info)
            res.render('contact')
        }

    })
})

module.exports = router;