import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";





type Target = {
    result: string
}




export default function Index() {
    let status = "Order status : delivered"

    let numb = "OrderNo: 2"

    let name = "damisi babalola"

    const router = useRouter()




    const [result, setResult] = useState<Target | null>(null)

    const search: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const form = e.currentTarget.elements as any



        const body = {
            find: form.item(0).value
        }

        router.push(`/TESTPAGES/${form.item(0).value}`)


        // const response = await fetch("/api/searchProduct", { method: "POST", body: JSON.stringify(body) })
        //     .then(res => {

        //         if (res.status === 200) {
        //             router.push(`/TESTPAGES/${form.item(0).value}`)
        //         }
        //     })
    }





    return (
        <DefaultLayout>
            <>

                <h1
                    className="text-black text-3xl"
                >
                    TEST AREA
                </h1>


                <form
                    onSubmit={search}

                >

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