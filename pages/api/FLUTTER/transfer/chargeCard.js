import axios from 'axios'
//credits the flutter


export default async function ChargeCard(req, res) {

    const doIt = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: `${process.env.SANDBOX_URL}/v1/flutterwave/v3/charges?type=card`,
        headers: {
            'Content-Type': 'application/json',
            'sandbox-key': process.env.SANDBOX_KEY,
            'Authorization': 'dskjdks'
        },
        data: {
            "client": "C10EgEYkJrusinoq55RgQ7rl+hlselSCuuX6GWx6VIJ7Ec7hXCGXup9Ukx8Luge/2HH2WYqXHvqdgrwMxhwlFMUV7tgqgH9ZCoe37pCnvkSkToNPiAbU0jG7L5i+WCxVR5/RaF0p0wbts8nb291rlgpnkk7QPuI2HcqR9R5Uairt/0O+PEmmFhF9v9A92X1w3zyAsGKQH98XxJxP9tAn176RahJL0upUhxrkJHoyJdaE55iicZGpg7Gu/CMYkgQHBGj3ODzL4Bla+pO+50wh5j2BIR+yjx8/V6uMw0qEPvfi5w+zQMoyQhFKvaYxk9P23L+SqR1tBzkty/aV4SCwLmpnzQnbXUewBqxZTQH+1MI="
        }
    }


    try {
        const response = await axios(doIt);
        console.log(response.data);
        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    



}