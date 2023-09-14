const express= require("express");
const app= express();
const PORT= 8000;
const bodyPaser= require("body-parser")
const session= require("express-session")
require("./config/conn")

app.use(bodyPaser.json())

app.use(session({
    secret:"my secret key",
    saveUninitialized:true,
    resave:false
})
);

app.use((req,res,next)=>{
    res.locals.message=req.session.message,
    delete req.session.message
    next();
})

app.use(express.static("uploads"))

app.get('/',(req,res)=>{
 res.send("hello")
})


app.set("view engine","ejs")

// import router=-------------------------------

app.use("",require("./route/allroutes"))

// app.get('/ejs',(req,res)=>{
//     res.render("index")
// })



app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})