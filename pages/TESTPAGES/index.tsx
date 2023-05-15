import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";

import notifier from "node-notifier";



type Target = {
    result: string
}




export default function Index() {
    let item = " maryland cookiessfunsfouwbwoubg"

    let price = " 20000"

    let description = "damisi babalola"

    const router = useRouter()





    const [result, setResult] = useState<Target | null>(null)

    const search: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const form = e.currentTarget.elements as any



        const body = {
            find: form.item(0).value
        }

        router.push(`/TESTPAGES/${form.item(0).value}`)



    }


    const aleting = async () => {
        await fetch("/api/notifier")
    }


    useEffect(() => {
        aleting()
    }, [])



    return (
        <DefaultLayout>
            <>

                <h1
                    className="text-black text-3xl"
                >
                    TEST AREA
                </h1>









                <div
                    className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6"

                >




                    <div className="bg-primary rounded-lg p-3 pb-5 ">
                        <div className="flex items-end break-words  text-white">

                            <div className="w-full  grid grid-cols-2 lg:grid-cols-2    text-left relative">


                                <p className="">
                                    {"second product"}
                                </p>

                                <p
                                    className=""
                                >
                                      ₦  {"55"}
                                </p>


                                <p
                                >
                                    Quantity:   {"2"}
                                </p>
                            </div>
                        </div>


                        <div
                            className=" grid lg:grid-cols-1 gap-6 pt-5 grid-cols-1"
                        >
                            <button
                                type="submit"
                                className="btn bg-black float-right text-white "
                            > Delete
                            </button>
                        </div>




                    </div>





                    <div className="bg-primary rounded-lg p-3 pb-5 ">
                        <div className="flex items-end break-words  text-white">

                            <div className="w-full  grid grid-cols-2 lg:grid-cols-2    text-left relative">


                                <p className="">
                                    {"second product"}
                                </p>

                                <p
                                    className=""
                                >
                                      ₦  {"55"}
                                </p>


                                <p
                                >
                                    Quantity:   {"2"}
                                </p>
                            </div>
                        </div>


                        <div
                            className=" grid lg:grid-cols-1 gap-6 pt-5 grid-cols-1"
                        >
                            <button
                                type="submit"
                                className="btn bg-black float-right text-white "
                            > Delete
                            </button>
                        </div>




                    </div>



                </div>












                {/* <div
                >


                    <div className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6">


                        <div className="text-primary rounded-lg  lg:text-3xl  text-lg">
                            Welcome ALPHA STORE{"  "}

                            <p>
                                Currently: open
                            </p>

                            <p
                                className="space-y-5 mt-1 lg:space-x-5"
                            >

                                <div
                                    className="text-green-500 btn btn-primary"
                                // onClick={OpStat}
                                >
                                    OPEN
                                </div>

                                <div
                                    className="text-red-500 btn btn-primary"
                                // onClick={closeStat}
                                >
                                    Closed
                                </div>
                            </p>


                        </div>



                        <div className="bg-primary rounded-lg  p-3">


                            <div className="flex items-end space-x-3">

                                <div className=" relative">


                                    <div className="text-black   font-bold  text-xl">
                                        Available Balance
                                    </div>

                                    <p
                                        className="text-gray-400"
                                    >
                                          ₦  100
                                    </p>
                                </div>
                            </div>

                            <div
                                className="pt-2 float-right w-1/2 hover:cursor-pointer "
                            >

                                <Link
                                    href="/"
                                >
                                    <div
                                        className="rounded-xl text-center text-sm  bg-black text-white "
                                    >
                                        Add new product
                                    </div>

                                </Link>


                            </div>
                        </div>

                    </div>

                </div> */}
            </>
        </DefaultLayout>
    )
}