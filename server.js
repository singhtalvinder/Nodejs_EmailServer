const express= require('express');
const path = require('path');
const sendMail = require('./mail');

const app = express();
const PORT = 8080;


// Do data Parsing
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// endpoint to receive email...
app.post('/email', (req,res) =>{

    const {subject, email, text} = req.body;
    console.log('Data received: ', req.body);
    // send the email..
    sendMail(email, subject, text, function(err, data){
        if(err) {
            res.status(500).json({message: 'An error occurend sending the email.'});
        } else {
            res.json({message: 'Email sent successfully!!'});
        }
    })

});


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

// ES6 
app.listen(PORT, () => console.log('Server started at : ', PORT));

// app.listen(PORT, () => {
//     console.log('Server started at : ', PORT);
//