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



                    <Header
                        title="All Creders"
                    />






                    <div className='  mx-auto'>
                        <Link
                            href="/ADMIN2823/Creder/newCreder">
                            <button className="btn btn-lg btn-primary btn-block">
                                Add Creder
                            </button>
                        </Link>
                    </div>





                </div>




                <div
                    className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6"

                >

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




                                <div className="bg-primary rounded-lg  p-3 hover:bg-primary/80">


                                    <div className="flex items-end space-x-3">

                                        <div className="w-1/2  relative">


                                            <div className="text-black   font-bold text-lg">
                                                {creder.firstname} {creder.lastname}
                                            </div>

                                            <p
                                                className="text-gray-400"
                                            >
                                                {creder.creder_no}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </Link>
                        </div>


                    )}

                </div>


            </>
        </AdminLayout>
    )
} 