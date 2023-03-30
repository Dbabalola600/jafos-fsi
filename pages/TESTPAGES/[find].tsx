


import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";




type Offers = {
    _id: string
    title: string
    category: string
    price: number
    description: string
    storename: string
}



export default function Found() {
    let status = "Order status : delivered"

    let numb = "OrderNo: 2"

    let name = "damisi babalola"

    const router = useRouter()

    let ssd = router.query


    const [offers, SetOffers] = useState<Offers[]>([]);


    const search = async () => {






        const body = {
            find: ssd.find
        }




        const response = await fetch("/api/searchProduct", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]

            SetOffers(response)
    }

    useEffect(() => {
        search()
    }, []
    )



    return (
        <DefaultLayout>
            <>

                <h1
                    className="text-black text-3xl"
                >
                    you did it
                </h1>



                <div>

                    {offers.map((offer: {
                        category: string
                        description: string
                        price: number
                        title: string;
                        storename: string
                        _id: string | null | undefined

                    }) => (
                        <div
                            key={offer._id}
                        >
                            <form className=" bg-primary text-red-500"
                            // onSubmit={
                            //     addCart
                            // }
                            >
                                <input
                                    defaultValue={offer.title}
                                    readOnly
                                />



                                <input
                                    readOnly
                                    defaultValue={offer.category}
                                />



                                <input

                                    defaultValue={offer.price}
                                    readOnly
                                />
                                <input
                                    readOnly
                                    defaultValue={offer.description}
                                />


                                {/* 
            <button

                type="submit"
                className="btn bg-black"
            > 
            {isLoading? "ADDING...":"ADD TO CART" }
            </button> */}


                            </form>
                        </div>
                    ))}
                </div>




            </>
        </DefaultLayout>
    )
}