import connectMongo from "../../../utils/connectMongo";
import TransferHistory from "../../../model/Transactions/TransferHistory";




export default async function fetchTransHistory(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');


        const rec_hist = await TransferHistory.find({ rec_id: id, trans_type: "CREDIT" }).sort({ createdAt: -1 })

        const sen_hist = await TransferHistory.find({ send_id: id, trans_type: "DEBIT" }).sort({ createdAt: -1 })
        const cred_hist = await TransferHistory.find({ rec_id: id, trans_type: "MASTER TOKEN CREDIT" }).sort({ createdAt: -1 })
        const tok_hist = await TransferHistory.find({ rec_id: id, trans_type: "TOKEN CREDIT" }).sort({ createdAt: -1 })




        





        const newHistStruct = [...rec_hist, ...sen_hist, ...cred_hist, ...tok_hist]




        const coolStruct = []

        

        for (let i = 0; i < sen_hist.length; i++) {
            coolStruct.push(sen_hist[i])
        }


        for (let i = 0; i < rec_hist.length; i++) {
            coolStruct.push(rec_hist[i])
        }
        for (let i = 0; i < cred_hist.length; i++) {
            coolStruct.push(cred_hist[i])
        }
        for (let i = 0; i < tok_hist.length; i++) {
            coolStruct.push(tok_hist[i])
        }



        //  console.log(coolStruct.length)

      
        let debit= sen_hist.length
        let credit = rec_hist.length
        let all = coolStruct.length
        let tok = tok_hist.length
       

        

        // console.log(tok_hist[0])
        return res.status(200).json(
           { debit,
            credit,
            all,
            tok}
        )


     
    } else {

        return res.status(400).json({
            message: "WRONG REQUEST",
        });

    }
}
