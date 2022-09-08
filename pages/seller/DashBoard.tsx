import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import CatLayout from "./Layout/CatLayout";



type Seller = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}

function DashBoard() {

    const [seller, setSeller] = useState<Seller | null>(null);

    const showinfo = async () => {

        const token = getCookie("user")
        console.log(token)
      
        const body = {
            _id: token
        }

        const response = await fetch("http://localhost:3000/api/seller/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


        setSeller(response)

        console.log(response)

    }

    useEffect(() => {
        showinfo()
    }, []
    )





    return (
        <CatLayout>
            <>

                <div
                    className=" bg-black md:w-60">
                    <div className="text-primary text-3xl">
                        Welcome {seller?.storename}
                    </div>

                </div>

                <div
                    className="text-2xl text-primary"
                >
                    Display orders
                </div>

            </>
        </CatLayout>
    )
}

export default DashBoard;