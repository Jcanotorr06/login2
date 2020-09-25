const router = require('express').Router();
const check = require('./tokenCheck');
const User = require('../model/User');
const mongoose = require('mongoose');

router.get('/', check, async (req, res) => {
  try{
    res.json({msg:'only for authenticated users', data: '500454545446'})
  }catch(err){
    res.status(500).json({msg:'JAJA STINKY'})
  }

});

router.get('/users', check, async (req, res) => {
  const info = mongoose.model('User');
  try{
    res.json({current: await info.findById(req.user.id) ,all: await info.find({})});
  }catch(err){
    res.status(500).json({msg: err});
  }
});


module.exports = router;
