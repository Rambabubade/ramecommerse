const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser'); 
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.get('/',(req,res)=>{
    res.json({"msg":"hello this is mern"})
})

app.listen(PORT,()=>{
    console.log(`server is running on port '${PORT}'`);
})
//Routes
app.use('/user',require('./routes/useRouter.js'))
app.use('/api',require('./routes/categoryRouter.js'))
app.use('/api/upload', require('./routes/upload.js'));
app.use('/api',require('./routes/productRouter.js'))
// mongodb connection
const MONGO_URI=process.env.MANGO_URI
mongoose.connect(MONGO_URI, 
    {
    //    useCreateIndex:true,
       useNewUrlParser:true,
       useUnifiedTopology:false
    //    useFindAndModify: false 
    }
).then(()=>{
    console.log('mongodb connected')
}).catch(err=>{
    console.error('error connecting to mongodb',err)
})