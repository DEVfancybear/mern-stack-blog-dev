const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://duong113:123@cluster0-wn0ns.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true}).then(() => console.log('Connected success Mongoose !')).catch(err => {
    console.log(err);
})
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))