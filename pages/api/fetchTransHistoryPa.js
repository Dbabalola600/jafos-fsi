import connectMongo from "../../utils/connectMongo";
import TransferHistory from "../../model/Transactions/TransferHistory";



export default async function fetchTransHistory(req, res) {
    try {
        await connectMongo();


        const ITEMS_PER_PAGE = 5;
        const page = req.query.page || 1

        //to skip items 
        const skip = (page - 1) * ITEMS_PER_PAGE

        let id = req.query.id


        //gettign all trans history 
        const rec_hist_promise = await TransferHistory.find({ rec_id: id, trans_type: "CREDIT" }).sort({ createdAt: -1 }).limit(ITEMS_PER_PAGE)
        .skip(skip)


        const sen_hist_promise = await TransferHistory.find({ send_id: id, trans_type: "DEBIT" }).sort({ createdAt: -1 }).limit(ITEMS_PER_PAGE)
        .skip(skip)

        const cred_hist_promise = await TransferHistory.find({ rec_id: id, trans_type: "MASTER TOKEN CREDIT" }).sort({ createdAt: -1 }).limit(ITEMS_PER_PAGE)
        .skip(skip)


        const withdraw_promise = await TransferHistory.find({ rec_id: id, trans_type: "WITHDRAW" }).sort({ createdAt: -1 }).limit(ITEMS_PER_PAGE)
        .skip(skip)


        const tok_hist_promise = await TransferHistory.find({ rec_id: id, trans_type: "TOKENCREDIT" }).sort({ createdAt: -1 }).limit(ITEMS_PER_PAGE)
        .skip(skip)

        const creder_hist_promise = await TransferHistory.find({ send_id: id, trans_type: "TOKENCREDIT" }).sort({ createdAt: -1 }).limit(ITEMS_PER_PAGE)
        .skip(skip)


        const newHistStruct = [...rec_hist_promise, ...sen_hist_promise, ...cred_hist_promise, ...tok_hist_promise, ...creder_hist_promise, ...withdraw_promise,]

        const coolStruct = []

        for (let i = 0; i < sen_hist_promise.length; i++) {
            coolStruct.push(sen_hist_promise[i])
        }

        for (let i = 0; i < rec_hist_promise.length; i++) {
            coolStruct.push(rec_hist_promise[i])
        }
        for (let i = 0; i < cred_hist_promise.length; i++) {
            coolStruct.push(cred_hist_promise[i])
        }
        for (let i = 0; i < tok_hist_promise.length; i++) {
            coolStruct.push(tok_hist_promise[i])
        }
        for (let i = 0; i < creder_hist_promise.length; i++) {
            coolStruct.push(creder_hist_promise[i])
        }
        for (let i = 0; i < withdraw_promise.length; i++) {
            coolStruct.push(withdraw_promise[i])
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

        //geting total 

        const countPromise = coolStruct.length

        const [count, history] = await Promise.all([countPromise, coolStruct])
        const pageCount = count / ITEMS_PER_PAGE;




        return res.status(200).json(
            {
                pagination: {
                    count,
                    pageCount
                },
                history
            }
        )



    } catch (error) {
        console.log(error);
        res.json({ error })
    }
}

