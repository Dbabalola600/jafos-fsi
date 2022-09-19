import { useEffect, useState } from "react"
import Header from "../../../components/shared/Header"
import StuLayout from "../../student/Layout/StuLayout"
import { InferGetServerSidePropsType } from "next"
import { Key } from "react"


type Offers = {
    _id: string
    title: string
    category: string
    price: number
    description: string
}


function Alpha() {
    const [offers, SetOffers] = useState<Offers[]>([]);


    const showOffer = async () => {

        const response = await fetch("/api/student/offers/fetchAlphaOffer", { method: "GET" })
            .then(res => res.json()) as Offers[]


        SetOffers(response)
        console.log(response)


        return {
            props: {
                offers: response
            }
        }
    }

    useEffect(() => {
        showOffer()
    }, [])


    return (

        <StuLayout>
            <>
                <Header
                    title=" Alpha"
                />

               
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

            </>
        </StuLayout>
    )
}


export default Alpha