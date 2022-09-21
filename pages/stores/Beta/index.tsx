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

function Beta() {
    const router = useRouter()

    const [offers, SetOffers] = useState<Offers[]>([]);


    const showOffer = async () => {

        const body = {
            name: "Beta"
        }

        const Offerresponse = await fetch("/api/seller/fetchOffer", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]


        SetOffers(Offerresponse)
        console.log(Offerresponse)


    }

    const filterFood = async () => {
        const body = {
            name: "Beta",
            typee: "Food"
        }

        const FilterResponse = await fetch("/api/student/offers/filterOffers", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]


        SetOffers(FilterResponse)

    }


    const filterDrinks = async () => {
        const body = {
            name: "Beta",
            typee: "Drinks"
        }

        const FilterResponse = await fetch("/api/student/offers/filterOffers", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]


        SetOffers(FilterResponse)

    }



    

    const filterSauce = async () => {
        const body = {
            name: "Beta",
            typee: "Sauce"
        }

        const FilterResponse = await fetch("/api/student/offers/filterOffers", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]


        SetOffers(FilterResponse)

    }
    const filterSpecial = async () => {
        const body = {
            name: "Beta",
            typee: "Special"
        }

        const FilterResponse = await fetch("/api/student/offers/filterOffers", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]


        SetOffers(FilterResponse)

    }





    const addCart: FormEventHandler<HTMLFormElement> = async (e) => {
        const user = getCookie("user")
        console.log(user)
        const form = e.currentTarget.elements as any

        const body = {
            user: user,
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
                    title=" Beta"
                />


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


export default Beta