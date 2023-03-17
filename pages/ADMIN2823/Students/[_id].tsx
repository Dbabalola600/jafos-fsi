import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Header from "../../../components/shared/Header";
import AdminLayout from "../Layout/AdminLayout";




type Student = {
    _id: string
    password: string
    firstname: string
    matricno: string
    lastname: string

}





export default function Users() {
    const router = useRouter()

    const [student, setStudent] = useState<Student | null>(null);
    const [isLoading, setLoading] = useState(false)

    let ssd = router.query

    console.log(ssd.id)
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

                <button
                    className="btn btn-primary w-full mt-10"
                    onClick={()=>delOne()}
                // type="submit"
                >


                    {isLoading ? "Loading..." : "DELETE USER"}
                </button>

            </>
        </AdminLayout >
    )
}