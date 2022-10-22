import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import AdminLayout from "./Layout/AdminLayout";
import Link from 'next/link'

type Admin = {
    _id: string
    firstname: string
    AdminId: number
    lastname: string
}





export default function DashBoard() {
    const [admin, setAdmin] = useState<Admin | null>(null)



    const showinfo = async () => {

        const token = getCookie("Adminuser")
        console.log(token)

        const body = {
            _id: token
        }




        const response = await fetch("/api/admin/fetchAdmin", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Admin


        setAdmin(response)
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



                <div
                    className=" bg-black md:w-60">
                    <div className="text-primary text-3xl">
                        Welcome {admin?.firstname}
                    </div>

                </div>





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


                <div className='  mx-auto'>
                    <Link
                        href="/ADMIN2823/Tokens">
                        <button className="btn btn-lg btn-primary btn-block">
                            Tokens
                        </button>
                    </Link>
                </div>


            </div>
        </AdminLayout>
    )
}