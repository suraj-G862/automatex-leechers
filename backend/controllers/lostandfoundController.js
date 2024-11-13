const LostAndFound = require("../models/LostandFound");

const addLostAndFound = async (req, res) => {
    console.log("addLostAndFound");
    const { ItemName, Description, ContactInfo, AddedBy } = req.body;
    const newLostAndFound = new LostAndFound({
        ItemName,
        Description,
        ContactInfo,
        AddedBy,
    });
    newLostAndFound
        .save()
        .then(() => res.json("Item added to Lost and Found"))
        .catch((err) => res.status(400).json("Error: " + err));
};

const getLostAndFound = async (req, res) => {   
    LostAndFound.find()
        .then((lostAndFound) => res.json(lostAndFound))
        .catch((err) => res.status(400).json("Error: " + err));
}

const deleteItem = async (req, res) => {
    // const {AddedBy , _id } = req.body;
    // if(AddedBy !== _id){
    //     return res.status(401).json("Unauthorized");
    // }
    LostAndFound.findByIdAndDelete(req.params.id)
        .then(() => res.json("Item deleted"))
        .catch((err) => res.status(400).json("Error: " + err));
}

module.exports = {
    addLostAndFound,
    getLostAndFound,
    deleteItem
};
  
