
import { useRouter } from "next/router"
import { FormEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../../components/shared/Header";
import CatLayout from "../../Layout/CatLayout";
import TextInput from "../../../../components/shared/TextInput";
import TextInputAlt from "../../../../components/shared/TextInputAlt";





type Offers = {
    _id: string
    title: string
    category: string
    price: number
    description: string
}


export default function Id() {
    const router = useRouter()
    const [offers, SetOffers] = useState<Offers | null>(null);
    const [isLoading, setLoading] = useState(false)

    let ssd = router.query

    console.log(ssd._id)

    const showinfo = async () => {

        const body = {
            _id: ssd._id
        }

        const response = await fetch("/api/seller/product/fetchProduct", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Offers



        SetOffers(response)
    }





    useEffect(() => {
        showinfo()
    }, [])





    const runAll: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)


        const formElements = e.currentTarget.elements as typeof e.currentTarget.elements

        const form = e.currentTarget.elements as any


        const body = {
            _id: ssd._id,
            title: form.item(0).value,
            price: form.item(1).value,
            category: form.item(2).value,
            description: form.item(3).value

        }


        //title
        const Titleresponse = await fetch("/api/seller/product/update/upTitle", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    console.log("yuppers")
                    // router.push("/seller/Products/")
                }
                if (res.status == 290) {
                    console.log("skipped")
                }
            }).catch(err => {
                console.log(err)
            })




        //price
        const Priceresponse = await fetch("/api/seller/product/update/upPrice", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    console.log("yuppers")
                    // router.push("/seller/Products/")
                }
                if (res.status == 290) {
                    console.log("skipped")
                }
            }).catch(err => {
                console.log(err)
            })



        //category
        const catresponse = await fetch("/api/seller/product/update/upCate", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    console.log("yuppers")
                    // router.push("/seller/Products/")
                }
                if (res.status == 290) {
                    console.log("skipped")
                }
            }).catch(err => {
                console.log(err)
            })

            
        //description
        const descresponse = await fetch("/api/seller/product/update/upDesc", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    console.log("yuppers")
                    router.push("/seller/Products/")
                }
                if (res.status == 290) {
                    console.log("skipped")
                }
            }).catch(err => {
                console.log(err)
            })



    }

    return (
        <CatLayout>
            <>
                <Header
                    title={offers?.title}
                    desc="Edit items"
                />




                <form
                    autoSave={"off"}
                    onSubmit={runAll}


                    autoComplete={"off"}
                    className="w-full py-20 space-y-16  text-black text-base md:text-xl"
                >


                    <div className="grid grid-cols-12 gap-x-0 md:gap-x-10 gap-y-12 md:gap-y-28">

                        {/* title */}
                        <div className="col-span-12  md:col-span-6 ">
                            <TextInputAlt
                                placeholder="Tiltle"
                                explacholder={offers?.title}
                                type="text"
                                name="Title: "
                                id="title"
                            />
                        </div>






                        {/* price */}
                        <div className="col-span-12  md:col-span-6 ">
                            <TextInputAlt
                                placeholder="Price"


                                type="number"

                                name="Price: "
                                explacholder={offers?.price}
                                id="price"

                            />
                        </div>

                        {/* category */}

                        <div className="col-span-12  md:col-span-6 ">
                            <TextInputAlt
                                placeholder="Category"
                                type="text"
                                explacholder={offers?.category}
                                name="Category (eg. drinks, food, etc.): "
                                id="description"

                            />
                        </div>




                        {/* description */}

                        <div className="col-span-12  md:col-span-6 ">
                            <TextInputAlt
                                placeholder="Description"
                                explacholder={offers?.description}
                                type="text"

                                name="Description: "
                                id="description"

                            />
                        </div>




                    </div>







                    <div className=" w-full  space-y-6">

                        <button className="w-full btn-primary btn "
                            type="submit"
                        // onClick={() => runall()}

                        >
                            {isLoading ? "Loading..." : "UPDATE"}

                        </button>

                    </div>

                </form>





            </>
        </CatLayout>
    )
}