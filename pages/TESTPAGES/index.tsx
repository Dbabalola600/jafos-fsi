import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";





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
                        <div className="flex items-end space-x-3 break-words">

                            <div className="w-full  text-left relative">


                                <div className="text-black   font-bold text-lg">
                                    {"second product"}
                                </div>

                                <p
                                    className="text-gray-400"
                                >
                                    NGN {"55"}
                                </p>
                            </div>
                        </div>


                        <div
                            className=" grid lg:grid-cols-2 gap-6 pt-5 grid-cols-1"

                        >
                            <button

                                type="submit"
                                className="btn bg-black float-right "
                            > Delete
                            </button>



                            <button

                                type="submit"
                                className="btn bg-black float-right "
                            > EDIT
                            </button>


                        </div>




                    </div>

                    <div className="bg-primary rounded-lg p-3 pb-5 ">
                        <div className="flex items-end space-x-3 break-words">

                            <div className="w-full  text-left relative">


                                <div className="text-black   font-bold text-lg">
                                    {"second product"}
                                </div>

                                <p
                                    className="text-gray-400"
                                >
                                    NGN {"55"}
                                </p>
                            </div>
                        </div>


                        <div
                            className=" grid lg:grid-cols-2 gap-6 pt-5 grid-cols-1"

                        >
                            <button

                                type="submit"
                                className="btn bg-black float-right "
                            > Delete
                            </button>



                            <button

                                type="submit"
                                className="btn bg-black float-right "
                            > EDIT
                            </button>


                        </div>




                    </div>




                </div>









                <div className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6">



                    <div className="bg-primary rounded-lg p-3 pb-10  ">
                        <div className="flex items-end space-x-3 break-words">

                            <div className="w-full  text-left relative">


                                <div className="text-black   font-bold text-lg">
                                    {item}
                                </div>

                                <p
                                    className="text-gray-400"
                                >
                                    NGN {price}
                                </p>
                            </div>
                        </div>



                        <div
                            className="w-1/2 grid grid-cols-3 lg:grid-cols-3 space-x-2 items-center lg:items-start"
                        >


                            <div
                                // onClick={() => handleQuantityChange("decrement")}

                                className="rounded-lg lg:w-10 w-5  bg-red-500 text-black text-center lg:text-3xl text-lg hover:cursor-pointer border-black border-2  " >
                                -
                            </div>

                            <div
                                className="bg-white lg:pt-3  pt-1 lg:w-10 w-5 item-center rounded-lg hover:bg-white hover:cursor-default text-center text-black"
                            >
                                {/* {quantity.toString} */} 2
                            </div>


                            <div
                                // onClick={() => handleQuantityChange("increment")}

                                className="rounded-lg lg:w-10 w-5  bg-green-500 text-black text-center lg:text-3xl text-lg hover:cursor-pointer border-black border-2  " >
                                +
                            </div>

                            {/* <div
                                // onClick={props.clickButton}
                                className="btn btn-red-500"
                            >
                                Delete button
                            </div> */}
                            <input
                                type="number"
                                className="bg-white hidden text-center text-black"
                                // value={quantity.toString}
                                min={1}
                                readOnly


                            />




                        </div>




                        <button

                            type="submit"
                            className="btn bg-black lg:float-right   mt-5 "
                        > delert
                        </button>



                    </div>



                    <div className="bg-primary rounded-lg  p-3 ">




                        <div className="">

                            <div
                                className="items-center justify-center "
                            >


                            </div>
                            <div className="flex items-end space-x-3 break-words" >

                                <div className="w-full  text-left relative">


                                    <div className="text-black   font-bold text-lg">
                                        {item}
                                    </div>

                                    <p
                                        className="text-gray-400"
                                    >
                                        NGN {price}
                                    </p>
                                </div>
                            </div>

                            <button

                                type="submit"
                                className="btn bg-black float-right"
                            > {"ADD TO CART"}
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
                                        NGN 100
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