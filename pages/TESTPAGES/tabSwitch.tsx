import { Key, useEffect, useState } from "react";
import Header from "../../components/shared/Header";
import StuLayout from "../student/Layout/StuLayout";

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



function tabSwitch() {


    //pointless
    const [activetab1, setActiceTab1] = useState("tab-lg tab")
    const [activetab2, setActiceTab2] = useState("tab-lg tab")
    const [activetab3, setActiceTab3] = useState("tab-lg tab")

    const clickOne = () => {
        setActiceTab1("tab-active tab-lg tab ")
    }

    const clickTwo = () => {
        setActiceTab2("tab-active tab-lg tab")
    }

    const clickThree = () => {
        setActiceTab3("tab-active tab-lg tab")

    }

    //pointless

    const [offers, SetOffers] = useState<Offers[]>([]);


    const showOffer = async () => {

        const body = {
            name: "Alpha",
            typee: "Drinks"
        }

        const Offerresponse = await fetch("/api/student/offers/filterOffers", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]


        SetOffers(Offerresponse)
        console.log(Offerresponse)


    }

    useEffect(() => {
        showOffer()
    }, []
    )





    return (
        <StuLayout>
            <>
                <Header
                    title="this is to test tab switching with content"
                />

                <div className="tabs tabs-boxed">
                    <button className={activetab1}
                        id="tab 1"
                        onClick={clickOne}
                    >
                        Tab 1

                    </button>





                    <button className={activetab2}
                        onClick={clickTwo}
                    >
                        Tab 2
                    </button>


                    <button className={activetab3}
                        onClick={clickThree}
                    >
                        Tab 3
                    </button>



                </div>
                <div
                    className="dropdown"
                >
                    <label tabIndex={0}

                        onClick={showOffer}
                        className="btn">
                        all
                    </label>

                    <div tabIndex={0} className="dropdown-content menu  bg-red-500 rounded-box w-52">

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

                                </div>
                            </div>
                        ))}
                    </div>
                </div>



                <div
                    className="dropdown"
                >
                    <label tabIndex={1} className="btn">
                        food
                    </label>

                    <div tabIndex={1} className="dropdown-content menu  bg-red-500 rounded-box w-52">

                        <div>item 1</div>
                        <div>item 2</div>
                        <div>item 3</div>
                    </div>
                </div>

            </>
        </StuLayout>
    )
}


export default tabSwitch