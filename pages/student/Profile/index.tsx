import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
import StuLayout from "../Layout/StuLayout";


type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
    email: string
    account_bal: number
}


export default function index() {

    const [student, setStudent] = useState<Student | null>(null);

    const router = useRouter()

    //this works
    // console.log(getCookie("user"))



    const showinfo = async () => {


        const token = getCookie("Normuser")
        const body = {
            _id: token
        }

        const response = await fetch("/api/student/fetchStudent", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Student

        setStudent(response)



    }

    useEffect(() => {
        showinfo()

    }, [])




    return (
        <StuLayout>
            <div
                className="w-full py-20 text-black text-base md:text-xl"
            >
                <Header
                    title="PROFILE PAGE"
                />


                <NavButton
                    uLink="/student/Transactions/creditAccount"
                    title=" Credit Account"
                />





                <NavButton
                    uLink="/student/Profile/updatePin"
                    title="Update Pin"
                />








                <NavButton
                    uLink="/student/Profile/updatePassword"
                    title=" Update Password"
                />


                <div className=" text-primary mt-10 space-y-5 bg-black w-full ">

                    <div>
                        NAME
                        <p>
                            {student?.firstname} {" "} {student?.lastname}
                        </p>

                    </div>

                    <div>
                        Matric No
                        <p>
                            {student?.matricno}
                        </p>

                    </div>


                    <div>
                        Email
                        <p>
                            {student?.email}
                        </p>

                    </div>



                </div>





            </div >
        </StuLayout>
    )
}

