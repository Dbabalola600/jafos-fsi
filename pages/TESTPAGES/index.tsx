import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";




export default function Index() {

    const executives = [
        { name: "Benjamin Ajibade", position: "President", link: "https://example.com" },
        { name: "Olatubusun John", position: "Vice-President", link: "https://example.com" },
        { name: "Babalola Damisi", position: "Financial Secretary", link: "https://example.com" },
        { name: "Ajayi Israel", position: "General Secretary", link: "https://example.com" },
        { name: "Merit Mohammed", position: "Assistant General Secretary", link: "https://example.com" },
        { name: "Chineye ", position: "Librarian", link: "https://example.com" },
        { name: "??", position: "Assistant Librarian", link: "https://example.com" },
        { name: "Kuboye Katete", position: "Public Relations Officer", link: "https://example.com" },
        { name: "Julo", position: "Director of Socials", link: "https://example.com" },
        { name: "Kemi Sarah", position: "Director of Sports", link: "https://example.com" }
    ];
    return (
        <DefaultLayout>
            <>

                <h1
                    className="text-black text-3xl"
                >
                    TEST AREA
                </h1>
                <div
                >


                    <div className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6">


                        <div className="text-primary text-3xl">
                            Welcome DAMISI{"  "}
                            <p>
                                18010301079
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
                                        NGN 1
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
                                        Credit Account
                                    </div>

                                </Link>


                            </div>
                        </div>

                    </div>

                </div>
            </>
        </DefaultLayout>
    )
}