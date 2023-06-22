import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import AdminLayout from "./Layout/AdminLayout";
import Link from 'next/link'
import Header from "../../components/shared/Header";
import UserDash from "../../components/shared/UserDash";
import UserDash2 from "../../components/shared/UserDash2";

type Admin = {
    _id: string
    firstname: string
    AdminId: number
    lastname: string
    account_bal: number
}





export default function DashBoard() {
    const [admin, setAdmin] = useState<Admin | null>(null)
    const [cash, setCash] = useState<number>(0)


    const showinfo = async () => {

        const token = getCookie("Adminuser")
        console.log(token)

        const body = {
            _id: token
        }




        const response = await fetch("/api/admin/fetchAdmin", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Admin


        setAdmin(response)


        const cashresponse = await fetch("/api/admin/TotalAmount") .then(res => res.json())

        setCash(cashresponse)
        console.log(response)
    }


    useEffect(() => {
        showinfo()
    }, []
    )

    return (
        <AdminLayout>
            <div
                className="w-full py-20 space-y-12  text-black text-base md:text-xl"


            >
                <Header
                    title="Dashboard"
                />


                <UserDash2
                    AccId={admin?.AdminId}
                    accBal={cash}
                    name={admin?.firstname}

                />
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-6">
                    <div className=" grid grid-cols-1 lg:grid-cols-1 rounded-lg   lg:text-3xl  text-lg  ">

                        <div className="text-primary lg:text-3xl  text-lg">
                            Welcome {admin?.firstname} {" "} {admin?.lastname}
                        </div>


                    </div>
                    <div className="text-primary  lg:text-3xl  text-lg lg:text-right">

                        <div>
                            {admin?.AdminId}
                        </div>

                    </div>
                </div> */}






                <div className='  mx-auto'>
                    <Link
                        href="/ADMIN2823/Students">
                        <button className="btn btn-lg btn-primary btn-block">
                            Student
                        </button>
                    </Link>
                </div>



                <div className='  mx-auto'>
                    <Link
                        href="/ADMIN2823/Staff">
                        <button className="btn btn-lg btn-primary btn-block">
                            Staff
                        </button>
                    </Link>
                </div>


                <div className='  mx-auto'>
                    <Link
                        href="/ADMIN2823/Sellers">
                        <button className="btn btn-lg btn-primary btn-block">
                            Seller
                        </button>
                    </Link>
                </div>




                <div className='  mx-auto'>
                    <Link
                        href="/ADMIN2823/Creder">
                        <button className="btn btn-lg btn-primary btn-block">
                            Creder
                        </button>
                    </Link>
                </div>


                {/* <div className='  mx-auto'>
                    <Link
                        href="/ADMIN2823/Tokens">
                        <button className="btn btn-lg btn-primary btn-block">
                            Tokens
                        </button>
                    </Link>
                </div> */}


            </div>
        </AdminLayout>
    )
}