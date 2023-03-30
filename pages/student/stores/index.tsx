import { useState, useEffect, FormEventHandler } from "react";
import Header from "../../../components/shared/Header";
import StoreButton from "../../../components/shared/storeButt";
import StuLayout from "../Layout/StuLayout";
import router from "next/router";








type Sellers = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
    status: string
    store_desc: string;
}






function Index() {

    const [sellers, SetSellers] = useState<Sellers[]>([])

    const showOffer = async () => {

        const response = await fetch("/api/student/fetchSeller", { method: "GET" })
            .then(res => res.json()) as Sellers[]



        SetSellers(response)

        console.log(response)

    }


    useEffect(() => {

        showOffer()
    }, [])




    //search

    const search: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const form = e.currentTarget.elements as any



        const body = {
            find: form.item(0).value
        }

        router.push(`/student/stores/find/${form.item(0).value}`)
    }



    return (
        <StuLayout>

            <>
                <Header
                    title="Avaialable stores"
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
                <div className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6">

                    {sellers.map((seller: {
                        store_desc: string;
                        _id: string | null | undefined;
                        status: string;
                        storename: string;
                    }) =>
                        <div
                            key={seller._id}
                        >



                            <StoreButton
                                ulink={`/student/stores/${seller._id}`}
                                name={seller.storename}
                                status={seller.status}
                                desc={seller.store_desc}
                            />

                        </div>
                    )}
                </div>

            </>
        </StuLayout>
    )
}



export default Index