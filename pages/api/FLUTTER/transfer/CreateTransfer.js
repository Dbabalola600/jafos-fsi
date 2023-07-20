// transfer from a bank accont 
// transfers out of flutter 
import axios from "axios";


export default async function Withdraw(req, res) {
    const remo = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: `${process.env.SANDBOX_URL}/v1/flutterwave/v3/transfers`,
        headers: {
            'Content-Type': 'application/json',
            'sandbox-key': process.env.SANDBOX_KEY,
            'Authorization': 'dskjdks'
        },
        data: {
            "account_bank": "044",
            "account_number": "0690000040",
            "amount": 5500,
            "narration": "Akhlm Pstmn Trnsfr xx007",
            "currency": "NGN",
            "reference": "akhlm-pstmnpyt-rfxx007_PMCKDU_1",
            "callback_url": "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
            "debit_currency": "NGN"
        }
    }


    try {
        const response = await axios(remo);
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


}