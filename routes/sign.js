const express = require('express')
const route = express.Router()
const userDB = require("../model/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

route.use(express.json())

//================ signup api =====================
route.post("/signup", async(req, res)=>{
    try{
        const {username, email, password} = req.body
        // console.log(req.body)
        const checkemail = await userDB.findOne({ email: email})
        console.log(checkemail);
        if(checkemail){
            return res.json({
                status: "failed",
                message: "email already registered, kindly signIn"
            })
        }

        bcrypt.hash(password, 10, async(err, encryptedPass)=>{
            if(err){
                return res.json({
                    status: 'failed',
                    message: err.message
                })
            } else{
                const userCreated = await userDB.create({
                    username,
                    email,
                    password: encryptedPass
                })
                // console.log(userCreated)
                res.json({
                    status: "user registerd successfully",
                    userCreated
                })
            }
        })
    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
})


//===================== signIn api ==================

route.post("/signin", async(req, res)=>{
    try{
        const {email, password} = req.body
        // console.log(req.body)
        const checkemail = await userDB.findOne({ email: email})
    
        if(!checkemail){
            return res.json({
                status: "failed",
                message: "email not registered, kindly register."
            })
        }
        
        const checkPassValidation = await bcrypt.compare(password, checkemail.password)
     
        if(!checkPassValidation){
            return res.json({
                status: "failed",
                message: "Invalide Credentials"
            })
        } else{
            let token = jwt.sign({
                exp: Date.now()*Math.floor(60*60*60),
                id: checkemail.id
            }, "SECRETKEY")
            
            res.status(200).json({
                status: "login success",
                details: checkemail,
                token: token
            })
        }    
    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = route