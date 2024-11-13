const Form = require("./../models/Form");
const addForm = async (req , res , next ) => {
    const {formName , creator , question , options} = req.body;
    // Options is the array which contains all the options for the given question
    if(!formName || !creator || !question || options.length == 0){
        return res.status(400).json({
            console : "Enter all the Fields"
        })
    }

    try{
        // Trying to save the forms into our database
        const form = await Form.create({
            formName ,
            creator,
            question,
            options
        });

        if(!form){
            return res.status(400).json({
                message : "Error in creating the form"
            })
        }
        
        await form.save();

        return res.status(200).json({
            message : "Form Created SuccessFully",
            data : form._id,
            overall : form
            
        });
    }
    catch(e){
        return res.status(400).json({
            message : e.message ,
            console : "Something Went Wrong"
        })
    }
}

const formVote = async ( req , res , next ) => {
    // Getting the form ID using url params
    const {id , votedOptionsIndex} = req.body;
    if(votedOptionsIndex === null){
        return res.status(400).json({
            console : "Did not Voted"
        });
    }
    // console.log(id);
    if(!id){
        return res.status(400).json({
            console : "Id Not Found in params"
        });
    }

    // Updating the votes in the respective form
    // For one user at a time , we have to keep track of the user
    // i.e the user that are voting on forms    
    try{
        const form = await Form.findById(id);
        if(!form){
            return res.status(400).json({
                console : "Id Not Found"
            });
        }

        // Adding the vote for the options
        const optionArr = form.options;
        // Increasing the votes
        form.options[votedOptionsIndex].votes += 1;

        // Adding the total number of user for calculating the percentage
        // For dynamicity we need to check whether user is already voted or not

        form.totalVote += 1;

        await form.save();

        return res.status(200).json({
            message : "Voted Successfully",
            Pos : votedOptionsIndex,
            final : form
        })

    }
    catch(e){
        return res.status(400).json({
            message : e.message ,
            console : "Something Went Wrong",
        })
    }
}

module.exports = {
    addForm ,
    formVote
};