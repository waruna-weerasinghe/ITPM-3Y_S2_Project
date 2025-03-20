const router = require('express').Router();
let Loyalty_Programme = require('../../models/Loyalty_Programme/Loyalty_Programme');

//add data to the Database

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newLoyalty_programme = new Loyalty_Programme({

    name,
    age,
    gender    

    })

    newLoyalty_programme.save().then(()=>{
        res.json("Loyalty added")
    }).catch((err)=>{
        console.log(err);
    })

})

//Retrive data from the database

router.route("/").get((req,res)=>{

    Loyalty_Programme.find().then((Loyalty_Programme)=>{

        res.json(Loyalty_Programme)

    }).catch((err)=>{
        console.log(err)
    })

})

//update the Loyalty_Programme

router.route("/update/:id").put(async (req,res) =>{

    let userId = req.params.id;
    const {name,age,gender} = req.body;

    const updateLoyaltyProgramme = {

        name,
        age,
        gender

    }

    const update = await Loyalty_Programme.findByIdAndUpdate(userId, updateLoyaltyProgramme).then(()=>{
        res.status(200).send({status:"user updated",user: update})
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500).send({status: "Error with Updating data",error: err.message});
    })
})

    //delete LoyaltyProgramme

    router.route("/delete/:id").delete(async (req,res) => {

        let userId = req.params.id;
        
        await Loyalty_Programme.findByIdAndDelete(userId).then(() => {

            res.status(200).send({status: "User Deleted"});

        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with Delete user",error: err.message})
        })

    })



module.exports = router;