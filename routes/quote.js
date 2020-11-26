const express = require('express');
const router = express.Router();

// nodemailer is user to send emails using the data recived from quote form submission.
const nodemailer = require("nodemailer");

// multer is used to read attached files.
const multer = require('multer');

multer({
    limits: { fieldSize: 2 * 1024 * 1024 }
})

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });


router.get('/', (req,res)=>{
    res.render('quote');
})


router.post('/', upload.array('filePond[]'), (req,res)=>{
    try{
        let data = req.body.filePond;
        let fileAttachments = [];
        data.map(attachment => {
            fileAttachments.push({
                filename: attachment.fileName,
                content: attachment.content,
                encoding: 'base64'
            })
        })
       
        // Gmail
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
             }
        })
    
        let mailOptions = {
            from:`${req.body.fullName} <${req.body.emailAddress}>`,
            to: 'conbailey90@gmail.com',
            subject: `Quick Quote: ${req.body.quoteType} Request From ${req.body.fullName} - ${req.body.emailAddress}`,
            text: `${req.body.quoteType} \n\n ${req.body.message} \n\n ADDRESS: ${req.body.homeAddress} \n\n TELEPHONE: ${req.body.phone} `,
            attachments : fileAttachments
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error);
            }else{
                console.log('Email sent')
                console.log(info)
            }
        })
        res.end('success')

    }catch(err){
        console.log(err);
    }
    
})

module.exports = router;