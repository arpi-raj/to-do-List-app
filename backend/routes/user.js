const {userMiddleware} = require("../Middleware/userMiddleware")
const mongoose = require('mongoose');
const {User} = require("../database/schema")
const {key} = require("../Middleware/config")
const {zSchema} = require("../database/types")
const { Router } = require("express");
const jwt = require("jsonwebtoken")
const router = Router();

router.post("/signup", async function(req,res){
  const {username,email,password} = req.headers

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

  
  try{
    await User.create({
      username,
      email,
      password,
    })
    res.json({
      msg:"User Created Successfully"
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

router.post('/signin', async (req, res) => {
  // Implement admin signup logic
  const {email,password} = req.headers
  const user = await User.find({
      email,
      password
      })
      console.log(key)
      console.log(user)
      if(user){
// always use a payload to access the data else you can't if you directly pass it
        const payload = {
          email:email,
          password:password
        }
        // gotta give the jwt a object always
      const token = jwt.sign(payload,key)
      res.json({
          token: token
      })
    }
    else{
      res.status(411).json({
          msg:"User Invalid"
      })
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
    res.json({
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
    res.json({
      msg: user.todo
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
    const {email,newpass} = req.headers
  const user = await User.findOne({email})
  if(!user){
    return res.json({
      msg:"User not on database try Sign-Up"
    })
    
  }
  else{
    try{
      const result = zSchema.safeParse({email,password:newpass})
      if(!result.success){
      return res.json({
        msg:"Password must be 8 characters"
      })
    }
    }catch(e){
      console.log(e)
    }
    user.password=newpass
    await user.save()
    res.json({
      msg:"Password updated successfully"
    })
  }
  }catch(e){
    res.status(411).json("Internal Server Error")
    console.log(e)
  }
})

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