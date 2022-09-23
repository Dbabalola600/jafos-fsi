import CatLayout from "../seller/Layout/CatLayout";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import StuLayout from "../student/Layout/StuLayout";
import Header from "../../components/shared/Header";



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



export default function stores() {
    const router = useRouter()
    const [offers, SetOffers] = useState<Offers[]>([]);
    const [seller, setSeller] = useState<Seller | null>(null);



    let ssd = router.query



    const showinfo = async () => {

        const body = {
            _id: ssd._id
        }

        const response = await fetch("/api/store/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


        setSeller(response)

        console.log(response["storename"])

        const body2 = {
            name: response["storename"]

        }

        const Offerresponse = await fetch("/api/store/fetchOffer", { method: "POST", body: JSON.stringify(body2) })
            .then(res => res.json()) as Offers[]


        SetOffers(Offerresponse)
        console.log(Offerresponse)



    }





    const addCart: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const user = getCookie("user")
        console.log(user)
        const form = e.currentTarget.elements as any

        const body = {
            user: user,
            storename: "Gama",
            title: form.item(0).value,
            category: form.item(1).value,
            price: form.item(2).value,

        }

        const reponse = await fetch("/api/student/newCart", { method: "POST", body: JSON.stringify(body) })
            .then(res => {

                if (res.status == 200) {
                    router.push("/student/Cart")
                }
            }).catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        showinfo()
    }, []
    )

    return (
        <StuLayout>
            <>
                <Header
                    title={seller?.storename}
                />




                <div>

                    {offers.map((offer: {
                        category: string
                        description: string
                        price: number
                        title: string;

                        _id: string | null | undefined

                    }) => (
                        <div
                            key={offer._id}
                        >
                            <form className=" bg-primary"
                                onSubmit={
                                    addCart
                                }
                            >
                                <input
                                    defaultValue={offer.title}

                                />



                                <input

                                    defaultValue={offer.category}
                                />



                                <input

                                    defaultValue={offer.price}

                                />


                                <button

                                    type="submit"
                                    className="btn bg-black"
                                > click</button>
                            </form>
                        </div>
                    ))}
                </div>
            </>

        </StuLayout>
    )
}