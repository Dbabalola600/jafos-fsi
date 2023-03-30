import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useState, useEffect, FormEventHandler } from "react"
import GoodMess from "../../../../components/shared/GoodMess"
import Header from "../../../../components/shared/Header"
import StuLayout from "../../Layout/StuLayout"








type Offers = {
    _id: string
    title: string
    category: string
    price: number
    description: string
    storename: string
}

type Seller = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}



export default function Found() {
    const router = useRouter()
    const [offers, SetOffers] = useState<Offers[]>([]);
    const [seller, setSeller] = useState<Seller | null>(null);

    const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })
    const [isLoading, setLoading] = useState(false)



    let ssd = router.query

    useEffect(() => {
        if (showgoodtoast.show) {
            setTimeout(() => {
                setgoodtoast({ message: "", show: false })
            }, 5000)
        }

    }, [showgoodtoast.show])



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






    // search 

    

    return (
        <StuLayout>
            <>
                <Header
                    title={"find from id"+  ssd.find}
                />
               
                {showgoodtoast.show && <GoodMess title="Added to Cart" />}



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



                                <button

                                    type="submit"
                                    className="btn bg-black"
                                > {isLoading ? "ADDING..." : "ADD TO CART"}</button>


                            </form>
                        </div>
                    ))}
                </div>
            </>

        </StuLayout>
    )
}