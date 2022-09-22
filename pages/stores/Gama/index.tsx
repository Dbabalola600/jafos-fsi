import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { FormEventHandler, Key, useEffect, useState } from "react"
import Header from "../../../components/shared/Header"
import StuLayout from "../../student/Layout/StuLayout"



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


function Gama() {
    const router = useRouter()

    const [offers, SetOffers] = useState<Offers[]>([]);


    const showOffer = async () => {

        const body = {
            name: "Gama"
        }

        const Offerresponse = await fetch("/api/seller/fetchOffer", { method: "POST", body: JSON.stringify(body) })
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
        showOffer()
    }, []
    )
    return (

        <StuLayout>
            <>

                <Header
                    title="Gama"
                />
                <div
                    className="text-red-500"
                >
                    display
                </div>


                <div>

                {offers.map((offer: {
                    category: string
                    description: string
                    price: number
                    title: string;

                    _id: Key | null | undefined

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


export default Gama