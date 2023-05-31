import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Header from "../../../components/shared/Header";
import AdminLayout from "../Layout/AdminLayout";
import Money_Format from "../../../components/shared/money_format";
import CusModal from "../../../components/shared/modal";




type Student = {
    _id: string
    password: string
    firstname: string
    matricno: string
    lastname: string
    email: string
    account_bal: number
}





export default function Users() {
    const router = useRouter()

    const [student, setStudent] = useState<Student | null>(null);
    const [isLoading, setLoading] = useState(false)

    let ssd = router.query


    const showinfo = async () => {

        const body = {
            _id: ssd._id
        }


        const response = await fetch("/api/admin/student/fetchStudentId", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Student
        setStudent(response)




    }


    useEffect(() => {
        showinfo()
    }, [])



    const delOne = async () => {
        setLoading(true)
        const body = {
            user: ssd._id
        }

        const response = await fetch("/api/admin/student/deleteStudent", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/ADMIN2823/Students")
                }
            })



        setLoading(false)
    }





    return (
        < AdminLayout >
            <>
                <Header
                    title={student?.firstname}
                />




                <div className=" text-primary mt-5 space-y-5 w-full ">

                    <div>
                        Name:  {student?.firstname} {" "} {student?.lastname}


                    </div>

                    <div>
                        Matric No: {student?.matricno}


                    </div>


                    <div>
                        Email: {student?.email}

                    </div>


                    <div>
                        Account Balance:<Money_Format amount={student?.account_bal} />
                    </div>

                </div>
                <div
                className="mt-10"
                >

                    <CusModal
                        mainButtonTitle="Delete User"
                        smButtonTitle="Delete"
                        modalInfo="Are you sure you wish to delete the user? user will not be able to be retrieved"
                        clickButton={() => delOne()}
                    />

                </div>






            </>
        </AdminLayout >
    )
}