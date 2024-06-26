require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'files/upload/', 
    filename: (req , file , callback) => {
        return callback (null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer ({ storage : storage })

const path = require('path');

const homepageRouter = require('./routes');
const router = require('./routes/api');
const privateRouter = require('./routes/private');
// const uploadRouter = require('./routes/upload');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Static inports

app.use(express.static('templates/index.html'));

app.use(express.static('styles')); //inport styles
app.use(express.static('assets')); //inport assets
app.use(express.static('files')); //inport uploaded files folder
app.use(express.static('scripts')); //inport assets

app.use(express.static('files/uploads/')); //inport uploaded fotos

// URL routing

app.use('/', homepageRouter);   //homepage
app.use('/api/', router);       //editing listings api
// app.use('/artist/', privateRouter);  //artist private page

app.post('/upload', upload.single('coverimg'), (req, res) => {
    // res.json(req.file);
    let f = req.file.filename
    console.log(f)
   //return
});

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log('Express server listening on port', port)
});

// teste