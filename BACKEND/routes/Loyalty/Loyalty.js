const router = require('express').Router();
let Loyalty_Programme = require('../../models/Loyalty_Programme/Loyalty_Programme');

//add data to the Database

router.route("/add").post((req,res)=>{

    const { name, email, telephone,address,category} = req.body;

    const newLoyalty_programme = new Loyalty_Programme({

    name,
    email,
    telephone,
    address,
    category    

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
    const { name, email, telephone,address,category} = req.body;

    const updateLoyaltyProgramme = {

    name,
    email,
    telephone,
    address,
    category    

    }

    const update = await Loyalty_Programme.findByIdAndUpdate(userId, updateLoyaltyProgramme).then(()=>{
        res.status(200).send({status:"user updated"})
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

router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await Loyalty_Programme.findById(userId)
    .then((Loyalty_Programme) => {
        res.status(200).send({status: "User Fetched", Loyalty_Programme})
    }).catch(()=> {
        console.log(err.message);
        res.status(500).send({status: "Error with get User", error: err.message})
    })
})    



module.exports = router;