const User = require("../models/UserModel");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


const generateToken = (id) => {
    return  jwt.sign({ id },process.env.JWT_SECRET,{expiresIn:"7d"})
}

const register = async (req,res) => {

    const {username, email, password} = req.body
    try {
        if(!username, !email, !password) return res.status(400).json({message:"Tüm Alanlar Zorunludur"})
         
        const userExist = await User.findOne({email})

        if(userExist) return res.status(400).json({message:"Bu Email Zaten Kayıtlı"})

        if(password.length < 6) return res.status(400).json({message:"Parola En Az 6 Karakterden Oluşmalı"})

        const hashedPassword = await bcryptjs.hash(password,12)
        
        const user = await User.create({  username, email, password: hashedPassword })
           
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            token: generateToken(user._id),
            message:"Kayıt Başarılı"
        })

    } catch (error) {
        console.log("error:",error)
        res.status(500).json({message:"Sunucu Hatası"})
    }
}

const login = async(req,res) => {

    const {email, password} = req.body
    
    try {
        
        if(!email, !password) return res.status(400).json({message:"Tüm Alanlar Zorunludur"})
        
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message:"Böyle Bir Kullanıcı Bulunamadı"})
        
        const isPasswordCorrect = user && (await bcryptjs.compare(password, user.password)) 
        
        if(!user || !isPasswordCorrect ) return res.status(400).json({message:"Geçersiz email veya şifre"})
        
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            message:"Giriş Başarılı"
        })
        

    } catch (error) {
        console.log("error:",error)
        res.status(500).json({message:"Sunucu Hatası"})
    }
     
}

module.exports = {
  register,
  login,
};