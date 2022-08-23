import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import StuLayout from "./Layout/StuLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import {getCookie} from "cookies-next"


type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
}




function DashBoard({ students }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    // useEffect(() => {
    //     window.localStorage.getItem("token")
    // }, [])


  //  window.localStorage.getItem("token")
    return (
        <StuLayout>
            <>

                {students.map((student: {
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
                )}


                <Header
                    title="dashboard"
                />



            </>
        </StuLayout>
    )
}


export const getServerSideProps: GetServerSideProps =  async ({req, res}) => {


    const token = getCookie("token", {req, res})
    const student = await fetch("http://localhost:3000/api/student/fetchStudent", { method: "GET", headers: {"Authorization": token?.toString() || ""} }).then(res => res.json())

    return {
        props: {
            students: student.students
        }
    }

}

// headers: {  window.localStorage.getItem("token") || "" }

export default DashBoard;
