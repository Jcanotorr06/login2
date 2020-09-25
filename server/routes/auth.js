const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../Requirements');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) =>{
  //Validate data before creating user
  const {error} = registerValidation(req.body)
  if(error) return res.status(400).send({message: error.details[0].message})

  //Check if user exists
  const emailExists = await User.findOne({email: req.body.email});
  if(emailExists) return res.status(400).json({msg: 'Email already exists'});

  //Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  //Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try{
    const savedUser = await user.save();
    res.json({user: user._id, msg:'User Created Successfuly'});
  }catch(err){
    res.status(400).json({msg: err})
  }
});


//Login
router.post('/login', async (req, res) =>{

  //Validate data attempting login
  const {error} = loginValidation(req.body)
  if(error) return res.status(400).json({msg: error.details[0].message})

  //Check if user exists
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).json({msg: 'User is not registered'});

  //Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).json({msg: 'Invalid Password'});

  try{
    //Create and send jwt token
    const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth_token', token).json({'token':token, msg:'Successfuly Logged In'});
  }catch{
    res.status(400).json({msg: 'Something Happened. Please Try Again'})
  }
});


module.exports = router;
