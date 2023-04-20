import connectMongo from "../../../../utils/connectMongo";
import CheckOutItem from "../../../../model/Student/CheckOutItem";






export default async function devFeeAmt(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { _id } = JSON.parse(req.body)



        console.log('FETCHING CHECKOUT');

        const orders = await CheckOutItem.find({ user: _id })
        console.log("FETCHED CHECKOUT")


       

        let store = []

        for (let i = 0; i < orders.length; i++) {
            store.push(orders[i].storename)

        }



        const n_store = [... new Set(store)]


        let fee = 0

        // console.log(orders[1].mod)

        for (let i = 0; i < n_store.length; i++) {

            if (orders[i].mod === "PickUp") {
                fee = 0
            } else {
                fee = fee + 100
            }

        }


        return res.status(200).json(
            {
                fee,
                n_store
            }
        )


    } else {

        return res.status(400).json({
            notFound: true,
        });

    }
}