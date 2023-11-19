const express = require("express")
const app = express()
const ocrRouter = require('./Routers/ocrRouter')
const cors = require("cors")


app.use(express.json())


const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:5173',"https://main.d266h49lqcwo0f.amplifyapp.com"  ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,
  };

app.use("/api/ocr",cors(corsOptions), ocrRouter)

  
app.listen(3000,()=>{
    console.log("server is running");
    
})

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'internal server error'
   
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
    })