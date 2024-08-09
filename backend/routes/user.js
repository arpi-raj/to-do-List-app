require('dotenv').config()
const {userMiddleware} = require("../Middleware/userMiddleware")
const otp = require("../Middleware/otpVerify")
const mongoose = require('mongoose');
const {User} = require("../database/schema")
const key = process.env.key
const {zSchema} = require("../database/types")
const { Router } = require("express");
const jwt = require("jsonwebtoken")
const router = Router();

let signupOtp,forgotOtp

router.post("/signup", async function(req,res){
  const {username,email,password} = req.body

  if (!username || !email || !password) {
    return res.status(400).json({
        msg: "userName, email, and password are required"
    });
}

const result = zSchema.safeParse({email, password });

if (!result.success) {
    console.log(result.error);
    return res.status(411).json({
        msg: "Invalid email format, or password minimum 8 characters required",
        errors: result.error.errors  // Send detailed error messages
    });
}

  signupOtp = otp.generateOTP();
  otpExpiryTime = Date.now() + (10 * 60 * 1000);

  try{
    await User.create({
      username,
      email,
      password,
      verifiedOtp:false
    })
    await otp.sendOTP(email,signupOtp)
    res.json({
      msg:"Please verify Otp"
    })
  }catch(e){
    console.log(e)

    if(e.errorResponse.code==11000){
      res.status(411).json({
        msg: "Email already exists sign in instead"
      })
    }
    else {
      res.status(411).json({
        msg: "Internal server error"
      })
    }
  }
})

router.post('/verifyotp',async (req,res)=> { 
  const {email,otp} = req.body;
  const user = await User.findOne({email})
  if(!user){
    return res.json({
      msg:"Email of user not found in temprory db"
    })
  }
  if (Date.now() > otpExpiryTime) {
    await User.deleteOne({email});
      return res.status(401).json({ message: 'OTP expired, sign up again' });
  }
  if (otp === signupOtp) {
    user.verifiedOtp = true
    await user.save()
      return res.status(200).json({ message: 'OTP verified successfully, User Created' });
  } else {
      return res.status(401).json({ message: 'Invalid OTP,try again' })
  }
}
)

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
  try{
  const {email,password} = req.body


  if(!email || !password){
    return res.status(401).json({
      msg:"Credentials not found"
    })
  }

  const user = await User.findOne({
      email,
      })

  console.log(user)

  if(!user){
    return res.status(401).json({
      msg:"User dosen't exists in database Sign-Up first"
    })
  }

  if(user.verifiedOtp===false){
    return res.status(401).json({
      msg:"Verify Otp first to sign in"
    })
  }

  if(user.password != password){
    return res.status(401).json({
      msg:"Invalid Passoword"
    })
  }
  
      else{
        // always use a payload to access the data else you can't if you directly pass it
        const payload = {
          email:email,
          password:password
        }
        // gotta give the jwt a object always
      const token = jwt.sign(payload,key, { expiresIn: '1h' })
      res.json({
          token: token
      })
    }
  }catch(e){
    res.status(500).json({
      msg:"Internal Error occured"
    })
    console.log(e)
  }

});

router.post('/add', userMiddleware, async(req,res)=>{

  try{
    const {title,
      description,
      completed,
      date} = req.body

      if(!title){
        return res.status(411).json({msg:"atleast title is required"})
      }
  
      const email = req.user.email
      const user = await User.findOne({email})
      console.log(user)
  
      const newTodo = {
        title,
        description,
        completed: completed || false,
        date: date || new Date()
    };
  
      user.todo.push(newTodo)
      await user.save();
  
      res.json({
        msg:"todo saved successfully"
      })
  }catch(e){
    res.status(500).json({
      msg:"an error occures while saving"
    })
  }
})

router.get('/todos', userMiddleware, async (req, res) => {
  try {
    // Access the verified user details from req.user
    console.log(req.user)
    const  email  =  req.user.email;
    // Log the details for debugging
    const user = await User.findOne({email})
    console.log(user)

    //const todosList = user.todo.map(todo => `${todo.title}: ${todo.description}`).join(', ');
    // Send a response with user details or any other data
    res.status(200).json({
      todos: user.todo
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      msg: 'Internal Server Error'
    });
  }
});

router.post('/forgotpass', async (req,res)=>{
  try{
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
      return res.json({
        msg:"User not on database try Sign-Up"
      })
    }
    const generatedOTP= otp.generateOTP()
    global.otpExpiryTime = Date.now() + (10 * 60 * 1000);
    global.generatedOTP=generatedOTP
    console.log(generatedOTP)
    otp.sendOTPForgot(email,generatedOTP)
    res.status(200).json({
      msg:"Please verify your otp to change the Password"
    })
  }catch(e){
    res.status(411).json("Internal Server Error")
    console.log(e)
  }
})

router.post('/verify-forgot', async (req, res) => {
  try {
    //headers m hamesa sab small letters m nhi toh wo conv. ho jate h aur error cause krte h
    //try using hashed passwords 
    // one more thing always use body to send these type of data 
    // no restrictions on name and they are safe headers are shown to network traffic body isn't 
    const { newpass, otp, email } = req.body;

    if (!newpass || !otp || !email) {
      console.log('Headers:', req.headers);
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    if (otp === generatedOTP) {
      user.password = newpass;
      await user.save();
      return res.status(200).json({ message: 'OTP verified successfully, Password Changed' });
    } else {
      return res.status(401).json({ message: 'Invalid OTP, try again' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});


router.post('/update',userMiddleware,async (req,res)=> {
  try{
    const  email  =  req.user.email;
    const user = await User.findOne({email})
  
    const {title,
      description,
      completed,
      date,id} = req.body
  
      const objectId = new mongoose.Types.ObjectId(id);
      if(!id){
        return res.status(411).json({msg:"Id is required"})
      }
      if (!title && !description && !completed && !date) {
        return res.status(411).json({ msg: "At least one new credential is required" });
      }
    const todo = user.todo.id(objectId)
    if(!todo){
      return res.json({
        msg:"Invalid Id, no todo found"
      })
    }
  
    todo.title = title
    todo.description = description
    todo.completed = completed
    todo.date = date
  
    await user.save()
  
    res.status(200).json({
      msg:"todo updated successfully"
    })
  }catch(e){
    res.status(411).json({
      msg:"Internal Server Error"
    })
    console.log(e)
  }
})



console.log('Exporting router:', typeof router);  // Add this line to log the type
module.exports = router;