import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";




export default function Index() {
let status = "Order status : delivered"

let numb ="OrderNo: 2"

let name ="damisi babalola"

    return (
        <DefaultLayout>
            <>

                <h1
                    className="text-black text-3xl"
                >
                    TEST AREA
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-6">



                    <div>

                        <Link
                            href="/"
                        >

                            <div className="bg-primary rounded-lg  p-3 hover:bg-primary/80">

                                <div
                                    className="items-center justify-center "
                                >
                                    <div
                                        className="rounded-xl text-center text-sm  bg-black text-white"
                                    >
                                        {status}
                                    </div>

                                </div>
                                <div className="flex items-end space-x-3">

                                    <div className="w-1/2  text-left relative">


                                        <div className="text-black   font-bold text-lg">
                                            {numb}
                                        </div>

                                        <p
                                            className="text-gray-400"
                                        >
                                            {name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>





                    <div>

                        <Link
                            href="/"
                        >

                            <div className="bg-primary rounded-lg  p-3 hover:bg-primary/80">

                                <div
                                    className="items-center justify-center "
                                >
                                    <div
                                        className="rounded-xl text-center text-sm  bg-black text-white"
                                    >
                                        {status}
                                    </div>

                                </div>
                                <div className="flex items-end space-x-3">

                                    <div className="w-1/2  text-left relative">


                                        <div className="text-black   font-bold text-lg">
                                            {numb}
                                        </div>

                                        <p
                                            className="text-gray-400"
                                        >
                                            {name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
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