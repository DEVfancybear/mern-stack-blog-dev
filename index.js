const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {User} = require('./models/user');
const config = require('./config/key')
const port = 5000;
// connect database mongoose
mongoose.connect(config.mongoURL,
    {useNewUrlParser: true}).then(() => console.log('Connected success Mongoose !')).catch(err => {
    console.log(err);
});
const app = express();
//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
// unlock cors
app.use(cors());
// method
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userData) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({
            success: true
        });
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))