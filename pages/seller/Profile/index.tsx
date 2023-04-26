import { useEffect, useState } from "react";
import CatLayout from "../Layout/CatLayout";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";





type Seller = {
    _id: string
    storename: string;
    store_desc: string
    account_bal: number
    status: string
}




export default function Index() {

    const router = useRouter()
    const [seller, setSeller] = useState<Seller | null>(null);




    const showinfo = async () => {


        const token = getCookie("Selluser")
        console.log(token)

        const body = {
            _id: token
        }

        const response = await fetch("/api/seller/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


        setSeller(response)


    }

    useEffect(() => {
        showinfo()

    }, [])




    return (
        <CatLayout>
            <>
                <Header
                    title="Profile Information"
                />

                <div className=" text-primary mt-5    text-xl space-y-5 w-full ">

                    <div>
                        Name:  {seller?.storename}


                    </div>

                    <div>
                        Store Information: {seller?.store_desc}


                    </div>






                </div>

                <div
                    onClick={() => history.back()}
                >

                    back
                </div>






                <NavButton
                    uLink="/seller/Profile/updatePin"
                    title="Update Pin"
                />








                <NavButton
                    uLink="/seller/Profile/updatePassword"
                    title=" Update Password"
                />

            </>


        </CatLayout>
    )
}