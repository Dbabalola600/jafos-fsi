import connectMongo from "../../../../utils/connectMongo";

import Product from "../../../../model/Seller/Products";








export default async function updateProduct(req, res) {
    if (req.method === "POST") {
        const { _id, title, price, category, description } = JSON.parse(req.body)





        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        // let massUp = []

        // massUp.push(title);
        // massUp.push(price)
        // massUp.push(category)
        // massUp.push(description)


        // console.log(massUp[0])





        if (title === "" || price === "" || description === "" || category === "") {
            console.log("HANDLED")
            return res.status(201).json({ message: "hsano" })
        } else {
            const massUpdate = await Product.findOneAndUpdate({ _id: _id }, {
                $set: {
                    title: title,
                    price: price,
                    category: category,
                    description: description
                }
            }
                , { new: true }
            )
            return res.status(200).json({ message: "GOOD FREAKING JOB" });


        }

        // return res.json(massUpdate)




        return res.status(200).json({ message: "GOOD FREAKING JOB" });








    } else {
        res.status(400).json({
            message: "wrong request"
        })
    }


}