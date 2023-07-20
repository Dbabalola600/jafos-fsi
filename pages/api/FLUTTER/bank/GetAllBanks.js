import axios from "axios";





export default async function GetBanks(req,res){
    const banks ={
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.SANDBOX_URL}/v1/flutterwave/v3/banks/NG?country=NG`,
        headers: { 
          'Content-Type': 'application/json', 
          'sandbox-key': process.env.SANDBOX_KEY, 
          'Authorization': 'dskjdks'
        }
    }

    try {
        const response = await axios(banks);
        // console.log(response.data);


        const bankName =[]

        for( let i =0; i<response.data.data.length ; i++ ){
            bankName.push(response.data.data[i])
        }


        res.status(200).json(bankName);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    

}