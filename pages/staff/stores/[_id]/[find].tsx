import { getCookie } from "cookies-next"
import ErrMess from "../../../../components/shared/ErrMess"
import GoodMess from "../../../../components/shared/GoodMess"
import Header from "../../../../components/shared/Header"
import InputFromStore from "../../../../components/shared/InputFromStore"
import StaffLay from "../../Layout/StaffLay"
import { FormEventHandler, useEffect, useState } from "react"
import { useRouter } from "next/router"







type Offers = {
    _id: string
    title: string
    category: string
    price: number
    description: string
    owner: string
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
    const [showtoast, settoast] = useState({ message: "", show: false })



    let ssd = router.query

    useEffect(() => {
        if (showgoodtoast.show) {
            setTimeout(() => {
                setgoodtoast({ message: "", show: false })
            }, 5000)
        }

    }, [showgoodtoast.show])




    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])



    const search = async () => {



        const body = {
            id: ssd._id,
            find: ssd.find
        }
        const response = await fetch("/api/searchStoreProduct", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers[]

        SetOffers(response)




        const body2 = {
            _id: ssd._id
        }

        const response2 = await fetch("/api/store/fetchSeller", { method: "POST", body: JSON.stringify(body2) })
            .then(res => res.json()) as Seller


        setSeller(response2)
    }






    useEffect(() => {
        search()
    }, []
    )






    const addCart: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        setLoading(true)
        const user = getCookie("Staffuser")
        // console.log(user)
        const form = e.currentTarget.elements as any




        const body = {
            user: user,
            storename: seller?.storename,
            title: form.item(0).value,
            category: form.item(1).value,
            price: form.item(2).value,

        }

        const reponse = await fetch("/api/staff/cart/newCart", { method: "POST", body: JSON.stringify(body) })
            .then(res => {

                if (res.status == 200) {
                    setgoodtoast({ message: " message", show: true })
                    // router.reload()
                    router.push("/staff/Cart")


                }
            }).catch(err => {
                console.log(err)
            })


        setLoading(false)
    }




    return (
        <StaffLay>
            <>
                <Header
                    title={"search result for " + ssd.find}
                />

                {showgoodtoast.show && <GoodMess title="Added to Cart" />}
                {showtoast.show && <ErrMess title="Not Found" />}



                <div
                    className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6"

                >

                    {offers.map((offer: {
                        category: string
                        description: string
                        price: number
                        title: string;
                        owner: string
                        _id: string | null | undefined

                    }) => (
                        <div
                            key={offer._id}
                        >
                            <form
                                className=""

                                onSubmit={
                                    addCart
                                }
                            >


                                <InputFromStore
                                    category={offer.category}
                                    price={offer.price}
                                    title={offer.title}
                                    owner={offer.owner}
                                    load={isLoading ? "ADDING..." : "ADD TO CART"}
                                />




                                {/* 
                                <button

                                    type="submit"
                                    className="btn bg-black"
                                > {isLoading ? "ADDING..." : "ADD TO CART"}</button> */}


                            </form>
                        </div>
                    ))}
                </div>
            </>

        </StaffLay>
    )
}
