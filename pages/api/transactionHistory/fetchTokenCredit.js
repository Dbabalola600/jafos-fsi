import connectMongo from "../../../utils/connectMongo";
import TransferHistory from "../../../model/Transactions/TransferHistory";






export default async function fetchCredit(req,res){
    if(req.method ==="POST"){
    console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');

        const rec_hist = await TransferHistory.find({ rec_id: id, trans_type: "TOKEN CREDIT" }).sort({ createdAt: -1 })


        const coolStruct = []

        for (let i = 0; i < rec_hist.length; i++) {
            coolStruct.push(rec_hist[i])
        }

        for (let i = 0; i < coolStruct.length; i++) {  //loop to access each array element
            for (let j = 0; j < coolStruct.length - i - 1; j++) { // loop to compare array elements
                if (coolStruct[j].createdAt < coolStruct[j + 1].createdAt) { // compares two adjacent elements
                    let swap = coolStruct[j];  // swap operation
                    coolStruct[j] = coolStruct[j + 1];
                    coolStruct[j + 1] = swap
                }
            }
        }

        console.log("GOTTEN")

        // console.log(tok_hist[0])
        return res.status(200).json(
            coolStruct
        )

    }
        else {

            return res.status(400).json({
                message: "WRONG REQUEST",
            });
    
        }
    
} 