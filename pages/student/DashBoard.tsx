import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import StuLayout from "./Layout/StuLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import cookie, { getCookie, hasCookie, getCookies } from "cookies-next"


type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
}




function DashBoard() {
    const [student, setStudent] = useState<Student | null>(null);


    //this works
    // console.log(getCookie("user"))



    const showinfo = async () => {


        const token = getCookie("user")
        const body = {
            _id: token
        }

        const response = await fetch("http://localhost:3000/api/student/fetchStudent", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Student


        setStudent(response)

       
        console.log(response)
        
        
    }
    useEffect(() => {
        showinfo()

    }, [])
   

    return (
        <StuLayout>
            <>

                {/* {student?.map((student: {
                    _id: string;
                    firstname: string
                    lastname: string
                    matricno: string
                }) => (
                    <div
                        className=" bg-black md:w-60"
                        key={student._id}>
                        <Header
                            title={"WELCOME" + student.firstname}
                            desc="this is the student dahboard"
                        />
                    </div>
                )
                )}   */}


                <Header
                    title="dashboard"
                />
                <div className="text-red-500 text-3xl">
                    welcome {student?.firstname }
                </div>


            </>
        </StuLayout>
    )
}


// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {


//     const token = getCookie("user", { req, res })
//     console.log(token)
//     // const Ntoken = JSON.stringify(token)
//     // console.log(Ntoken)

//     // const student = await fetch("http://localhost:3000/api/student/fetchStudent", { method: "GET", headers: {"Authorization": token?.toString() || ""} }).then(res => res.json())
//     const student = await fetch("http://localhost:3000/api/student/fetchStudent",
//         {
//             method: "GET",
//             headers: {
//                 'Content-Type': 'application/json',

//             },
//             // body: (JSON.stringify(token))
//         }).then(res => res.json()) as Student[]
//     return {
//         props: {
//             students: student
//         }
//     }

// }

// headers: {  window.localStorage.getItem("token") || "" }

export default DashBoard;
