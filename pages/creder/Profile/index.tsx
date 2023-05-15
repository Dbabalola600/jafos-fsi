import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
import student from "../../student";
import CredLayout from "../Layout/credLayout";






type Creder = {
    _id: string
    creder_no: string;
    firstname: string
    lastname: string
    account_bal: number
}





export default function Index() {

    const [creder, setCreder] = useState<Creder | null>(null);

    const showinfo = async () => {

        const token = getCookie("Creduser")
        console.log(token)

        const body = {
            _id: token
        }

        const response = await fetch("/api/creder/fetchCreder", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Creder


        setCreder(response)


    }

    useEffect(() => {
        showinfo()
    }, []
    )




    return (
        <CredLayout>
            <>


                <div
                    className="w-full py-20 text-black text-base md:text-xl"
                >






                    <Header
                        title="Profile Information"
                    />






                    <div className=" text-primary mt-5 space-y-5 w-full ">

                        <div>
                            Name:  {creder?.firstname} {" "} {creder?.lastname}


                        </div>

                        <div>
                            Creder ID: {creder?.creder_no}


                        </div>






                    </div>






                    <NavButton
                        uLink="/creder/Profile/updatePin"
                        title="Update Pin"
                    />








                    <NavButton
                        uLink="/creder/Profile/updatePassword"
                        title=" Update Password"
                    />








                </div >



            </>

        </CredLayout>
    )

}