import { getCookie } from "cookies-next";
import Link from "next/link";
import { Key, useEffect, useState } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import CatLayout from "./Layout/CatLayout";



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


    const [offers, SetOffers] = useState<Offers[]>([]);


    const showinfo = async () => {

        const token = getCookie("user")
        console.log(token)
      
        const body = {
            _id: token
        }

        const response = await fetch("/api/seller/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


      

        console.log(response.storename)




        const body2 ={
            name: response.storename
        }


        const Offerresponse = await fetch("/api/seller/fetchOffer", {method: "POST", body: JSON.stringify(body2)})
        .then(res=> res.json()) as Offers[]


        SetOffers(Offerresponse)
        console.log(Offerresponse)
    }

    useEffect(() => {
        showinfo()
    }, []
    )

    return (
        <CatLayout>
            <>



                <div className="grid grid-cols-2 space-x-10">

                    <div
                        className=" bg-black  ">
                        <div
                            className="text-center text-primaryColour font-bold mx-auto text-2xl">
                            VIEW OFFERINGS
                        </div>
                    </div>




                    <div className='  mx-auto'>
                        <Link
                            href="/seller/newOffer">
                            <button className="btn btn-lg btn-primary btn-block">
                                Add Offering
                            </button>
                        </Link>
                    </div>





                </div>

                <div>
                    
                {offers.map((offer: {
                    description: string
                    price: number
                    title: string;

                    _id: Key | null | undefined

                }) => (
                    <div
                        key={offer._id}
                    >
                        <div className="text-red-500">
                            {offer.title} {" "}
                            {offer.price}{" "}
                            {offer.description}
                        </div>
                    </div>
                ))}
                </div>

            </>
        </CatLayout>
    )
}

export default Offerings;