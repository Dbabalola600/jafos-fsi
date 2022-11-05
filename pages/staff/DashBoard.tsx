import Header from "../../components/shared/Header";
import {  Key, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getCookie, hasCookie, getCookies } from "cookies-next"

import StoreButton from "../../components/shared/storeButt";
import StaffLay from "./Layout/StaffLay";







type Staff = {
    _id: string;
    firstname: string
    lastname: string
    staffid: string
    account_bal: number
}

type Sellers = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
    status: string
}



export default function DashBoard() {

    const [staff, setStaff] = useState<Staff | null>(null);
    const [sellers, SetSellers] = useState<Sellers[]>([])
    const router = useRouter()

    //this works
    // console.log(getCookie("user"))



    const showinfo = async () => {


        const token = getCookie("Staffuser")
        const body = {
            _id: token
        }

        const response = await fetch("/api/staff/fetchStaff", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Staff

        setStaff(response)





        const SellerResponse = await fetch("/api/staff/fetchSeller", { method: "GET" })
            .then(res => res.json()) as Sellers[]

        SetSellers(SellerResponse)



    }

    useEffect(() => {
        showinfo()

    }, [])






    return (

        <StaffLay>
            <>


                <Header
                    title="Dashboard"
                />
                <div className="text-primary text-3xl">
                    Welcome {staff?.firstname} {"  "}
                    {staff?.account_bal} Credits
                </div>


                <div
                    className="pt-5"
                >
                    <div
                        className="text-primary  text-2xl font-bold text-center  underline"
                    >
                        Available Stores
                    </div>

                </div>

                <div
                    className="grid grid-cols-2 space-x-5 mx-auto"
                >


                    {sellers.map((seller: {
                        _id: Key | null | undefined;
                        status: string;
                        storename: string;
                    }) =>
                        <div
                            key={seller._id}
                        >
                            <StoreButton
                                ulink={`/staff/stores/${seller._id}`}
                                name={seller.storename}
                                status={seller.status}
                                desc="description "
                            />
                        </div>
                    )}



                </div>


            </>
        </StaffLay>

    )
}
