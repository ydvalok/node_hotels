const express =require('express');
const router = express.Router()
const Person = require('./../Models/person')
router.post('/', async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const response = await newPerson.save();

    console.log('Data saved');
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
});


router.get('/', async(req,res)=>{
  try{
    const data = await Person.find()
    res.status(200).json(data)
;
    console.log('data fetched')
  

  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
}) ;

router.put('/:id', async(req,res)=>{
  try{
        const personid = req.params.id;
        const updatePersonData = req.body;
        const response = await Person.findByIdAndUpdate(personid, updatePersonData,{
          new:true, // return the updated document
          runValidators : true,// run mongoose validation
        })
        if(!response)
          {
            return res.status(404).json({error:'person not found'})

        }
        console.log('data upload');
        res.status(200).json(response);
  }catch(err){
    console.log(err);
         res.status(500).json({ error: 'internal server error' });
  
  }
})


router.get('/:workType',async(req,res)=>{
 try{
   const workType= req.params.workType;
 if ( 
      workType === 'Chef' ||
      workType === 'Waiter' ||
      workType === 'Manager' ||
      workType === 'developer'
    )
  {
    const response = await Person.find({work: workType});
    console.log('response fetched')
    res.status(200).json(response);

  }else{
  
    res.status(404).json({error:'invalid work type'});
  }
 }catch(err){
  console.log(err);
  res.status(500).json({error: 'internal server error'})
 }
});
router.delete('/:id', async (req,res)=>{
  try{
   const personid = req.params.id;
   const response = await Person.findByIdAndDelete(personid);
if(!response){
  return res.status(404).json({error : 'person not deleted yet'});
}
   res.status(200).json({
      message: 'Person deleted successfully',
      deletedPerson: response
    });
  }catch(error)
  {
    console.log(error);
    res.status(500).json({error : 'internal server'})

  }
});


module.exports = router;
