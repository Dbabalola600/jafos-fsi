import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import AdminLayout from "../Layout/AdminLayout";

type Creders = {
    _id: string
    creder_no: string;
    firstname: string
    lastname: string
    account_bal: number
}









export default function Index() {

    const [creders, SetCreders] = useState<Creders[]>([])
    const router = useRouter()
    const showinfo = async () => {
        const Response = await fetch("/api/admin/creder/fetchCreder", { method: "GET" })
            .then(res => res.json()) as Creders[]

        SetCreders(Response)

        console.log(Response)

    }


    useEffect(() => {
        showinfo()

    }, [])






    return (
        <AdminLayout>
            <>
                <div className="grid grid-cols-2 space-x-10">

                    <div
                        className=" bg-black  ">
                        <div
                            className="text-center text-primaryColour font-bold mx-auto text-2xl">
                            VIEW Tokens
                        </div>
                    </div>




                    <div className='  mx-auto'>
                        <Link
                            href="/ADMIN2823/Creder/newCreder">
                            <button className="btn btn-lg btn-primary btn-block">
                                Add Creder
                            </button>
                        </Link>
                    </div>





                </div>





                {creders.map((creder: {
                    _id: string
                    creder_no: string;
                    firstname: string
                    lastname: string
                    account_bal: number
                }) =>
                    <div
                        key={creder._id}
                    >
                        <Link
                            href={`/ADMIN2823/Creder/${creder._id}`}
                        >
                            <a>
                                <Header
                                    title={creder.creder_no}
                                    desc={creder.firstname}
                                />
                            </a>
                        </Link>
                    </div>


                )}
            </>
        </AdminLayout>
    )
} 