import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useState, useEffect, FormEventHandler } from "react"
import GoodMess from "../../../components/shared/GoodMess"
import Header from "../../../components/shared/Header"
import StuLayout from "../Layout/StuLayout"
import InputFromStore from "../../../components/shared/InputFromStore"







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



export default function Stores() {
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



    const showinfo = async () => {

        const body = {
            _id: ssd._id
        }

        const response = await fetch("/api/store/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


        setSeller(response)

        // console.log(response["storename"])

        const body2 = {
            name: response["storename"]

        }

        const Offerresponse = await fetch("/api/store/fetchOffer", { method: "POST", body: JSON.stringify(body2) })
            .then(res => res.json()) as Offers[]


        SetOffers(Offerresponse)
        // console.log(Offerresponse[0].description)



    }





    const addCart: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        setLoading(true)
        const user = getCookie("Normuser")
        // console.log(user)
        const form = e.currentTarget.elements as any

        const body = {
            user: user,
            storename: seller?.storename,
            title: form.item(0).value,
            category: form.item(1).value,
            price: form.item(2).value,

        }

        const reponse = await fetch("/api/student/cart/newCart", { method: "POST", body: JSON.stringify(body) })
            .then(res => {

                if (res.status == 200) {
                    setgoodtoast({ message: " message", show: true })
                    // router.reload()
                    router.push("/student/Cart")


                }
            }).catch(err => {
                console.log(err)
            })


        setLoading(false)
    }


    useEffect(() => {
        showinfo()
    }, []
    )






    // search 

    const search: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const form = e.currentTarget.elements as any



        const body = {
            find: form.item(0).value
        }

        router.push(`/student/stores/${ssd._id}/${form.item(0).value}`)


       
    }

    return (
        <StuLayout>
            <>
                <Header
                    title={  seller?.storename}
                />
                <form
                    onSubmit={search}

                >
                    <div
                        className="text-center text-primary mb-3"
                    >
                        search for a product or category(eg. food, water, mouse pad etc)
                    </div>

                    <div className="flex justify-center">
                        <div className="mb-3 xl:w-96">
                            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                <input
                                    type="search"
                                    className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-black font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="button-addon3"


                                />
                                <button


                                    className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                                    type="submit"
                                    id="button-addon3"
                                    data-te-ripple-init>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>


                </form>
                {showgoodtoast.show && <GoodMess title="Added to Cart" />}



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

        </StuLayout>
    )
}