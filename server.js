require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;
const multer = require("multer");
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
    if (!req.file) {
        console.log("no file")
        return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log(req.file);
    res.json({
        message: 'File uploaded successfully',
        file: req.file
    });
    
});



app.get("/", (req, res) => {
    res.send("Server is running! Use POST /api/upload to upload a file.");
});



app.listen(PORT,() => console.log("server listening on http://localhost:5050"))
