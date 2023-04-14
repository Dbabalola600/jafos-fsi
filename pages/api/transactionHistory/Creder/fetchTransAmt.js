import connectMongo from "../../../../utils/connectMongo";
import TransferHistory from "../../../../model/Transactions/TransferHistory";


export default async function fetchTransHistory(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');


        const with_hist = await TransferHistory.find({ rec_id: id, trans_type: "WITHDRAW" }).sort({ createdAt: -1 })
        const tok_hist = await TransferHistory.find({ send_id: id, trans_type: "TOKENCREDIT" }).sort({ createdAt: -1 })

        const coolStruct = []

        for (let i = 0; i < with_hist.length; i++) {
            coolStruct.push(with_hist[i])
        }
        for (let i = 0; i < tok_hist.length; i++) {
            coolStruct.push(tok_hist[i])
        }

        let w_hist = with_hist.length
        let tok = tok_hist.length
        let all = coolStruct.length

        return res.status(200).json(
            {
                all,
                w_hist,
                tok
            }
        )

    } else {
        return res.status(400).json({
            message: "WRONG REQUEST",
        });

    }
}





