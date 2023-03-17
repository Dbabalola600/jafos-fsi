import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
import StaffLay from "../Layout/StaffLay";






type Staff = {
    _id: string;
    firstname: string
    lastname: string
    staffid: string
    account_bal: number
}


export default function Index() {

    const [staff, setStaff] = useState<Staff | null>(null);

    const router = useRouter()

   


    const showinfo = async () => {


        const token = getCookie("Staffuser")
        const body = {
            _id: token
        }

        const response = await fetch("/api/staff/fetchStaff", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Staff

        setStaff(response)



    }

    useEffect(() => {
        showinfo()

    }, [])




    return (
        <StaffLay>
            <div
                className="w-full py-20 text-black text-base md:text-xl"
            >
                <Header
                    title="PROFILE PAGE"
                />


                <NavButton
                    uLink="/staff/Transactions/creditAccount"
                    title=" Credit Account"
                />





                <NavButton
                    uLink="/staff/Profile/updatePin"
                    title="Update Pin"
                />








                <NavButton
                    uLink="/staff/Profile/updatePassword"
                    title=" Update Password"
                />


                <div className=" text-primary mt-10 space-y-5 bg-black w-full ">

                    <div>
                        NAME
                        <p>
                       </p>

                    </div>

                    <div>
                        Matric No
                        <p>
                       </p>

                    </div>


                    <div>
                        Email
                        <p>
                        </p>

                    </div>



                </div>





            </div >
        </StaffLay>
    )
}

