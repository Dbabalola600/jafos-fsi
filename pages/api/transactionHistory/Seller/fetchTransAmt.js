import connectMongo from "../../../../utils/connectMongo";
import TransferHistory from "../../../../model/Transactions/TransferHistory";


export default async function fetchTransHistory(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');


        const deb_hist = await TransferHistory.find({ sen_id: id, trans_type: "WITHDRAW" }).sort({ createdAt: -1 })
        const cred_hist = await TransferHistory.find({ rec_id: id, trans_type: "CREDIT" }).sort({ createdAt: -1 })

        const coolStruct = []

        for (let i = 0; i < deb_hist.length; i++) {
            coolStruct.push(deb_hist[i])
        }
        for (let i = 0; i < cred_hist.length; i++) {
            coolStruct.push(cred_hist[i])
        }

        let deb = deb_hist.length
        let cred = cred_hist.length
        let all = coolStruct.length

        return res.status(200).json(
            {
                all,
               deb,
                cred
            }
        )

    } else {
        return res.status(400).json({
            message: "WRONG REQUEST",
        });

    }
}





