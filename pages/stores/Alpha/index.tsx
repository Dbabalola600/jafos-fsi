import { FormEventHandler, useEffect, useState } from "react"
import Header from "../../../components/shared/Header"
import StuLayout from "../../student/Layout/StuLayout"
import { InferGetServerSidePropsType } from "next"
import { Key } from "react"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router";


type Offers = {
    _id: string
    title: string
    category: string
    price: number
    description: string
}


function Alpha() {
    const router = useRouter()
    const [offers, SetOffers] = useState<Offers[]>([]);


    const showOffer = async () => {

        const body = {
            name: "Alpha"
        }

        const Offerresponse = await fetch("/api/seller/fetchOffer", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]


        SetOffers(Offerresponse)
        console.log(Offerresponse)


    }


    const filterFood = async () => {
        const body = {
            name: "Alpha",
            typee: "Food"
        }

        const FilterResponse = await fetch("/api/student/offers/filterOffers", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]


        SetOffers(FilterResponse)

    }


    const filterDrinks = async () => {
        const body = {
            name: "Alpha",
            typee: "Drinks"
        }

        const FilterResponse = await fetch("/api/student/offers/filterOffers", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]


        SetOffers(FilterResponse)

    }



    const filterSauce = async () => {
        const body = {
            name: "Alpha",
            typee: "Sauce"
        }

        const FilterResponse = await fetch("/api/student/offers/filterOffers", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]


        SetOffers(FilterResponse)

    }




    const filterSpecial = async () => {
        const body = {
            name: "Alpha",
            typee: "Special"
        }

        const FilterResponse = await fetch("/api/student/offers/filterOffers", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]


        SetOffers(FilterResponse)

    }

    useEffect(() => {
        showOffer()
    }, []
    )


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





    return (

        <StuLayout>
            <>
                <Header
                    title=" Alpha"
                />





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


                <Header
                    title="ORRR"
                />



                <div
                    className=" grid grid-cols-4  mx-auto overscroll-x "
                >

                    <div
                        className="dropdown"
                    >
                        <label tabIndex={0}

                            onClick={showOffer}
                            className="btn-primary btn">
                            all
                        </label>

                        <div tabIndex={0} className="dropdown-content menu  bg-red-500 w-52">

                            {offers.map((offer: {
                                description: string
                                price: number
                                title: string;

                                _id: Key | null | undefined

                            }) => (
                                <div
                                    key={offer._id}
                                >
                                    <div className="">
                                        {offer.title} {" "}
                                        <button
                                            className="btn bg-black"
                                        > click</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                    <div
                        className="dropdown "
                    >
                        <label tabIndex={1}

                            onClick={filterFood}
                            className="btn-primary btn">
                            Food
                        </label>

                        <div tabIndex={1} className="dropdown-content menu  bg-red-500 w-60 ">

                            {offers.map((offer: {
                                description: string
                                price: number
                                title: string;

                                _id: Key | null | undefined

                            }) => (
                                <div
                                    key={offer._id}
                                >
                                    <div className="">
                                        {offer.title} {" "} {offer.price} {" "}
                                        <button
                                            className="btn bg-black"
                                        > click</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>




                    <div
                        className="dropdown dropdown-end"
                    >
                        <label tabIndex={2}

                            onClick={filterDrinks}
                            className="btn-primary btn">
                            Drinks
                        </label>

                        <div tabIndex={2} className="dropdown-content menu  bg-red-500 w-52 ">

                            {offers.map((offer: {
                                description: string
                                price: number
                                title: string;

                                _id: Key | null | undefined

                            }) => (
                                <div
                                    key={offer._id}
                                >
                                    <div className="">
                                        {offer.title} {" "}
                                        <button
                                            className="btn bg-black"
                                        > click</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>




                    <div
                        className="dropdown dropdown-end"
                    >
                        <label tabIndex={3}

                            onClick={filterSauce}
                            className="btn-primary btn">
                            Sauce
                        </label>

                        <div tabIndex={3} className="dropdown-content menu  bg-red-500 w-52 ">

                            {offers.map((offer: {
                                description: string
                                price: number
                                title: string;

                                _id: Key | null | undefined

                            }) => (
                                <div
                                    key={offer._id}
                                >
                                    <div className="">
                                        {offer.title} {" "}
                                        <button
                                            className="btn bg-black"
                                        > click</button>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>

                </div>



                <Header
                    title="ORRRRR"
                />





                <div
                    tabIndex={0}

                    onClick={showOffer}
                    className="collapse">
                    <input type="checkbox" className="peer" />
                    <div

                        className="collapse-title bg-primaryColour text-white ">
                        All
                    </div>
                    <div className="collapse-content bg-primaryColour text-white ">
                        {offers.map((offer: {
                            description: string
                            price: number
                            title: string;

                            _id: Key | null | undefined

                        }) => (
                            <div
                                key={offer._id}
                            >
                                <div className="">
                                    {offer.title} {" "} {offer.price} {" "}
                                    <button
                                        className="btn bg-black"
                                    > click</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>







                <div
                    tabIndex={1}
                    onClick={filterFood}
                    className="collapse">
                    <input type="checkbox" className="peer" />
                    <div

                        className="collapse-title bg-primaryColour text-white ">
                        Food
                    </div>
                    <div className="collapse-content bg-primaryColour text-white ">
                        {offers.map((offer: {
                            description: string
                            price: number
                            title: string;

                            _id: Key | null | undefined

                        }) => (
                            <div
                                key={offer._id}
                            >
                                <div className="">
                                    {offer.title} {" "} {offer.price} {" "}
                                    <button
                                        className="btn bg-black"
                                    > click</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>




                <div
                    tabIndex={2}
                    onClick={filterDrinks}
                    className="collapse">
                    <input type="checkbox" className="peer" />
                    <div

                        className="collapse-title bg-primaryColour text-white ">
                        Drinks
                    </div>
                    <div className="collapse-content bg-primaryColour text-white ">
                        {offers.map((offer: {
                            description: string
                            price: number
                            title: string;

                            _id: Key | null | undefined

                        }) => (
                            <div
                                key={offer._id}
                            >
                                <div className="">
                                    {offer.title} {" "} {offer.price} {" "}
                                    <button
                                        className="btn bg-black"
                                    > click</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>






                <div
                    tabIndex={3}
                    onClick={filterSauce}
                    className="collapse">
                    <input type="checkbox" className="peer" />
                    <div

                        className="collapse-title bg-primaryColour text-white ">
                        Sauce
                    </div>
                    <div className="collapse-content bg-primaryColour text-white ">
                        {offers.map((offer: {
                            description: string
                            price: number
                            title: string;

                            _id: Key | null | undefined

                        }) => (
                            <div
                                key={offer._id}
                            >
                                <div className="">
                                    {offer.title} {" "} {offer.price} {" "}
                                    <button
                                        className="btn bg-black"
                                    > click</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>






            </>
        </StuLayout>
    )
}


export default Alpha