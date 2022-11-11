import { getCookie } from "cookies-next";
import Link from "next/link";
import { Key, useEffect, useState } from "react";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import Header from "../../../components/shared/Header";

import CatLayout from "../Layout/CatLayout";


import { useRouter } from "next/router"


type Offers = {
    _id: string
    title: string
    category: string
    price: number
    description: string
}


type Seller = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}

function Offerings() {
    const router = useRouter()

    const [offers, SetOffers] = useState<Offers[]>([]);


    const showinfo = async () => {

        const token = getCookie("Selluser")
        console.log(token)

        const body = {
            _id: token
        }

        const response = await fetch("/api/seller/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller




        console.log(response.storename)




        const body2 = {
            name: response.storename
        }


        const Offerresponse = await fetch("/api/seller/fetchOffer", { method: "POST", body: JSON.stringify(body2) })
            .then(res => res.json()) as Offers[]


        SetOffers(Offerresponse)
        console.log(Offerresponse)
    }

    useEffect(() => {
        showinfo()
    }, []
    )


    const del = async (_id: any) => {
        const response = await fetch("/api/seller/product/delProduct", { method: "POST", body: JSON.stringify(_id) })
            .then(res => {
                if (res.status === 200) {
                    router.reload()
                }
            })



    }




    return (
        <CatLayout>
            <>



                <div className="grid grid-cols-2 space-x-10">

                    <div
                        className=" bg-black  ">
                        <div
                            className="text-center text-primaryColour font-bold mx-auto text-2xl">
                            VIEW PRODUCTS
                        </div>
                    </div>




                    <div className='  mx-auto'>
                        <Link
                            href="/seller/Products/newProduct">
                            <button className="btn btn-lg btn-primary btn-block">
                                Add Product
                            </button>
                        </Link>
                    </div>





                </div>

                <div>

                    {offers.map((offer: {
                        description: string
                        price: number
                        title: string;

                        _id: string | null | undefined

                    }) => (
                        <div
                            key={offer._id}
                            className="pt-5"
                        >


                            <div className="text-red-500">
                                {offer.title} {" "}
                                {offer.price}{" "}
                                {offer.description}
                            </div>






                            <div className="grid grid-cols-2 space-x-10">

                                <button className="btn btn-lg btn-primary btn-block"
                                    onClick={() => del(offer._id)}
                                >
                                    delete
                                </button>




                                <div className='mx-auto'>
                                    <Link
                                        href={`Products/Edit/${offer._id}`}
                                    >
                                        <button className="btn btn-lg btn-primary btn-block">
                                            Edit
                                        </button>
                                    </Link>
                                </div>





                            </div>

                        </div>
                    ))}
                </div>

            </>
        </CatLayout>
    )
}

export default Offerings;