const express = require('express');
const app = express();


const PORT = process.env.PORT || 5000;

// Middleware

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/about', (req, res)=>{
    res.render('index', {about: true});
})

app.use('/quote', require('./routes/quote'));
app.use('/contact', require('./routes/contact'));
app.use('/projects', require('./routes/projects'));



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})