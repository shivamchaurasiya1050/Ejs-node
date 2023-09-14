const User = require("../model/userModel")
const multer = require("multer")
const express = require("express");
const fs = require("fs")
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./uploads");

    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    } 
})

var upload = multer({
    storage: storage
}).single("image")


// add user------------------------------------------
router.post("/add", upload, async (req, res) => {
    const { name, email, phone } = req.body
    try {
        const user = await User.create({ name, email, phone, image: req.file.filename });
        req.session.message = {
            type: "success",
            message: "User added successfullyt",


        };
        res.redirect("/users")
    } catch (err) {
        res.json({
            message: err.message, type: "danger"
        })
    }

})


// get all user-----------------------------------
router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        if (!users) {
            res.json({ message: "Users not found" })
        } else {
            res.render("index", {
                title: "home page",
                users: users
            })
        }
    } catch (error) {
        console.log(error)
    }
})

// edit an user---------------------
router.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    const users = await User.findById(id)

    if (!users) {
        res.redirect("/users")
    } else {
        res.render("edit_users", {
            title: "Edit Users",
            users: users
        })
    }
    //    (err,users)=>{
    //     if(err){
    //         res.redirect("/users")
    //     }else{
    //         if(users== null){
    //               res.redirect("/users")
    //         }else{
    //             res.render("edit_users",{
    //                 title:"Edit Users",
    //                 users:users
    //             })
    //         }
    //     }
    //    })
})


// update user------------------------------
router.post('/update/:id', upload, async (req, res) => {
    let id = req.params.id;
    let new_image = "";
    if (req.file) {
        new_image = req.file.filename;
        try {
            fs.unlinkSync("./uploads/" + req.body.old_image);

        } catch (err) {
            console.log(err)
        }
    } else {
        new_image = req.body.old_image;
    }

    try {
        const users = await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image
        })

        req.session.message = {
            type: "success",
            message: "User Updated successfullyt",
        };
        res.redirect("/users")


    } catch (err) {
        res.json({
            message: err.message, type: "danger"
        })
    }




})
//delete user-------------------------------

router.get("/delete/:id",async(req,res)=>{
    let id= req.params.id;
    try {
        const user= await User.findByIdAndDelete(id)
        if(user.image!= ""){
            fs.unlinkSync('./uploads/'+user.image)
        }
        req.session.message = {
            type: "info",
            message: "User deleted successfully",
        };
        res.redirect("/users")
    } catch (error) {
        res.json({
            message: err.message, type: "danger"
        })
    }

})
// router.get("/users",(req,res)=>{
//     res.render("index",{title:"home page"})
// });

router.get("/add", (req, res) => {
    res.render("add_user", { title: "add user" })
})


module.exports = router;