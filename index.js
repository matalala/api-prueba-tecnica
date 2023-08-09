const express=require('express');
const {dbConn}=require('./conn');
const bodyParser = require('body-parser');
const userModel = require('./modelols/Usuers');
const app=express();
dbConn()
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, DELETE, PUT, OPTIONS'
    )
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})
app.get("/",(req,res)=>{
    res.json({msj:"server corriendo"})
})
app.post('/login',async (req,res)=>{
    const {email }=req.body
    const resp = await userModel.find({email})
    if(resp.length){
        console.log(resp)
        res.status(200).json({data:resp,msg:""})
    }else{
        res.status(200).json({data:null,msg:"usuario no existe"})
    }
})
app.post('/registro',async (req,res)=>{
    const {email,tipo,foto}=req.body;
    const user= await userModel.find({email})
    if(user.length){
        res.status(200).json({data:null,msg:"el usuario ya existe"})
    }else{
        const newuser=new userModel({
            email,
            perfil:tipo,
            foto
        })
        await newuser.save()
        const resp= await userModel.find({email})
        res.status(200).json({data:resp,msg:""})
    
    }
})
app.listen('3001',()=>{
    console.log('server corriendo')
})


