const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const User = require('../models/User');

router.route('/').get((req, res) => {
    Medicine.find((err, medicines) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(medicines);
        }
    });
});

router.route('/find').post((req, res) => {
    const term = req.body;
    const s = Object.keys(term).toString();
    if(s !== ""){
        Medicine.find({ symptom : {'$regex' : `^${s}`, '$options' : 'i'}}, (err, medicines) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(medicines);
            }
        });
    }
    else{
        Medicine.find((err, medicines) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(medicines);
            }
        });
    }
});

router.route('/like/:userId').get(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId });
    const medicines = await Medicine.find({ _id: { $in: user.liked }});
    return res.json(medicines);
});

router.route('/like/:userId/:medicineId').post(async (req, res) => {
    const { userId, medicineId } = req.params;

    const updated = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { liked: medicineId } },
      { new: true }
    );

    const medicines = await Medicine.find({ _id: { $in: updated.liked }});

    return res.json(medicines);
});

router.route('/take/:userId/:medicineId').post(async (req, res) => {
    try {
        const { userId, medicineId } = req.params;
        const { date, daysCount } = req.body;

        const medicine = await Medicine.findOne({ _id: medicineId });

        const updated = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { toTake: { medicineId: medicine._id, begin: new Date(date), days: daysCount } } },
        { new: true }
          );

        return res.json(updated);
    } catch (error) {
        return res.json({ error });
    }
});

router.route('/filter/').post((req, res) => {
    const filters = req.body;
    const f = Object.keys(filters).toString()
    Medicine.find({ name : {'$regex' : `^${f}`, '$options' : 'i'}}, (err, medicines) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(medicines);
        }
    });
});

router.route('/take/:userId').get(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    const toTake = user.toTake;
    return res.json(toTake);
    // return res.json(medicines);
    // const medicines = await Medicine.find({ _id: { $in: user.toTake }});
    // return res.json(medicines);
});

// router.route('/add').post( (req, res) =>{
//     const medicine = new Medicine(req.body);
//     medicine.save().then( medicine => {
//         res.status(200).json({'medicine': 'medicine added successfully'});
//     })
//     .catch(err => {
//         res.status(400).send('error in adding');
//     });
// });


module.exports = router;
