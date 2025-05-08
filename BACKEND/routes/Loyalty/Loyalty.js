const router = require('express').Router();
let LoyaltyProgramme = require('../../models/LoyaltyProgramme/LoyaltyProgramme');

//add data to the Database

router.route("/add").post((req,res)=>{

    const { name, email, telephone,address,category,image} = req.body;

    const newLoyalty_programme = new LoyaltyProgramme({
    userId,
    name,
    email,
    telephone,
    address,
    category,
    image    

    })

    newLoyalty_programme.save().then(()=>{
        res.json("Loyalty added")
    }).catch((err)=>{
        console.log(err);
    })

})

//Retrive data from the database

router.route("/").get((req,res)=>{

    LoyaltyProgramme.find().then((LoyaltyProgramme)=>{

        res.json(LoyaltyProgramme)

    }).catch((err)=>{
        console.log(err)
    })

})

//update the Loyalty_Programme

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, email, telephone, address, category, image } = req.body;

    const updateLoyaltyProgramme = {
        name,
        email,
        telephone,
        address,
        category: JSON.stringify(category), // Store category as JSON
        image
    };

    try {
        await LoyaltyProgramme.findByIdAndUpdate(userId, updateLoyaltyProgramme);
        res.status(200).send({ status: "User updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating data", error: err.message });
    }
})

    //delete LoyaltyProgramme

    router.route("/delete/:id").delete(async (req,res) => {

        let userId = req.params.id;
        
        await LoyaltyProgramme.findByIdAndDelete(userId).then(() => {

            res.status(200).send({status: "Loyalty Form Deleted"});

        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with Delete Loyalty Form",error: err.message})
        })

    })

router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await LoyaltyProgramme.findById(userId)
    .then((LoyaltyProgramme) => {
        res.status(200).send({status: "Loyalty Form Fetched", LoyaltyProgramme})
    }).catch(()=> {
        console.log(err.message);
        res.status(500).send({status: "Error with get Loyalty Form", error: err.message})
    })
})



module.exports = router;