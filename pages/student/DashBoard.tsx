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
    const [student, setStudent] = useState<Student>();


    //this works
    // console.log(getCookie("user"))



    const showinfo = async () => {


        const token = getCookie("user")
        const body = {
            _id: token
        }

        const response = await fetch("http://localhost:3000/api/student/fetchStudent", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Student

        console.log(JSON.stringify(response, ['student', 'firstname']))


        setStudent(response)

        const user = JSON.stringify(response, ['student', 'lastname'])
        
       console.log(user)

    }

    useEffect(() => {
        showinfo()
       
    }, [])


    return (
        <StuLayout>
            <>



                {/* {students.map(student => (

                    <div
                        key={student._id}
                    >
                        {student.firstname}
                    </div>

                ))} */}


                <Header
                    title="dashboard"
                />
                <div className="text-red-500 text-3xl">
                    welcome {student?.firstname}
                </div>


            </>
        </StuLayout>
    )
}



export default DashBoard;
