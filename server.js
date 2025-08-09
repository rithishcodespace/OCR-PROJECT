require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;
const multer = require("multer");
const tesseract = require("tesseract.js")

app.use(express.json());

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

app.post('/api/upload', upload.single('uploadedImage'), (req, res) => {
   try{
     tesseract.recognize(
        'uploads/'+req.file.filename,
        'eng',
        {logger:m => console.log(m)}
     ).then(({data:{text}}) => {
        return res.json(text)
     })
   }
   catch(error){
    console.log(error);
   }
    
});

app.listen(PORT,() => console.log("server listening on http://localhost:5050"))
