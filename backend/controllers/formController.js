const Form = require("./../models/Form");

const addForm = async (req , res ) => {
    const {formName , creator , question , options } = req.body;
    console.log(req.body);
    // Options is the array which contains all the options for the given question
    if(!formName || !creator || !question || options.length == 0){
        return res.status(400).json({
            console : "Enter all the Fields"
        })
    }

    try{
        const form = await Form.create({
            formName ,
            creator,
            question,
            options,
            votes : new Array(options.length).fill(0)
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

const formList = async (req , res) => {
    try{
        const form = await Form.find({});
        if(!form){
            return res.status(400).json({
                console : "No Form Found"
            })
        }

        return res.status(200).json({
            message : "Form List",
            data : form
        })
    }
    catch(e){
        return res.status(400).json({
            message : e.message ,
            console : "Something Went Wrong"
        })
    }
}

// const formVote = async ( req , res , next ) => {
//     // Getting the form ID using url params
//     const {id , votedOptionsIndex} = req.body;
//     if(votedOptionsIndex === null){
//         return res.status(400).json({
//             console : "Did not Voted"
//         });
//     }
//     // console.log(id);
//     if(!id){
//         return res.status(400).json({
//             console : "Id Not Found in params"
//         });
//     }

//     // Updating the votes in the respective form
//     // For one user at a time , we have to keep track of the user
//     // i.e the user that are voting on forms    
//     try{
//         const form = await Form.findById(id);
//         if(!form){
//             return res.status(400).json({
//                 console : "Id Not Found"
//             });
//         }

//         // Adding the vote for the options
//         const optionArr = form.options;
//         // Increasing the votes
//         form.options[votedOptionsIndex].votes += 1;

//         // Adding the total number of user for calculating the percentage
//         // For dynamicity we need to check whether user is already voted or not

//         form.totalVote += 1;

//         await form.save();

//         return res.status(200).json({
//             message : "Voted Successfully",
//             Pos : votedOptionsIndex,
//             final : form
//         })

//     }
//     catch(e){
//         return res.status(400).json({
//             message : e.message ,
//             console : "Something Went Wrong",
//         })
//     }
// }
// Controller function to handle voting

///not working
// const formVote = async (req, res) => {
//   try {
//     const { formId, updatedVotes } = req.body;
//     console.log(req.body);
//     // Find the form by ID
//     const form = await Form.findById(formId);
//     if (!form) {
//       return res.status(404).json({ message: "Form not found" });
//     }

//     // Update the votes array
//     form.votes = updatedVotes;

//     // Save the updated form
//     await form.save();
//     res.status(200).json({ message: "Vote recorded successfully", votes: form.votes });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const formVote = async (req, res) => {
    try {
        const { formId, updatedVotes } = req.body;
        console.log(req.body);
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }
        form.votes = updatedVotes;

        await form.save();
        console.log(form);
        res.status(200).json({ message: "Vote recorded successfully", votes: form.votes });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const fetchVotes = async (req, res) => {
    try {
        const { formId } = req.body;
        const form = await Form.findById(formId);   
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json({ message: "Votes fetched successfully", votes: form.votes });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}



module.exports = {
    addForm ,
    formVote,
    formList,
    fetchVotes
};