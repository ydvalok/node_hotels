const express =require('express');
const router = express.Router()
const MenuItem = require('./../Models/MenuItem');
const person = require('../Models/person');

router.post('/',async(req,res)=>{
  try{
    const items= new MenuItem(req.body);
    const response =await items.save();
    res.status(200).json(response)
  }catch(error){
       console.error(error);
    res.status(500).json({ error: 'internal server error' });
  
  }
  });

router.get('/', async (req, res) => {
    try {
      const data = await MenuItem.find();
      res.status(200).json(data);
      console.log('menu data fetched');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'internal server error' });
    }
  });
router.get('/taste/:taste', async (req, res) => {
  try {
    const taste = req.params.taste.toLowerCase(); // convert to lowercase
    const items = await MenuItem.find({ taste: taste });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'internal server error' });
  }
});


  
module.exports = router; 