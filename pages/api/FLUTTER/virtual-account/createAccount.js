
import axios from 'axios';
// require('dotenv').config();


export default  async function createAccount(req,res){

    const options = {
      method: 'POST',
      url: `${process.env.SANDBOX_URL}/v1/flutterwave/v3/virtual-account-numbers`,
      headers: {
        'Content-Type': 'application/json',
        'sandbox-key': process.env.SANDBOX_KEY,
        'Authorization': 'dskjdks'
      },
      data: {
        "email": "developers@flutterwavego.com",
        "is_permanent": true,
        "bvn": "12345678903",
        "tx_ref": "VA12",
        "phonenumber": "09024966745",
        "firstname": "Angela",
        "lastname": "Ashley",
        "narration": "Angela Ashley-Osuzoka"
      }
    };
    
    try {
        const response = await axios(options);
        console.log(response.data);
        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
}