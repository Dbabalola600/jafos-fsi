import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import AdminLayout from "../Layout/AdminLayout";

type Students = {
    _id: string
    firstname: string
    matricno: string
    lastname: string
}




export default function Index() {
    const [students, SetStudents] = useState<Students[]>([])
    const router = useRouter()



    const showinfo = async () => {
        const StudentResponse = await fetch("/api/admin/student/fetchStudent", { method: "Get" })
            .then(res => res.json()) as Students[]

        SetStudents(StudentResponse)

    }


    useEffect(() => {
        showinfo()
    }, [])


    return (
        <AdminLayout>
            <>
                <Header
                    title=" This displays all the students "
                />





                <div className='  mx-auto'>
                    <Link
                        href="/ADMIN2823/Students/newStudent">
                        <button className="btn btn-lg btn-primary btn-block">
                            Add Student
                        </button>
                    </Link>
                </div>

                {students.map((student: {
                    _id: string
                    firstname: string
                    matricno: string
                    lastname: string
                }) =>
                    <div
                        key={student._id}
                    >
                        <Link
                        href={`/ADMIN2823/Students/${student._id}`}
                        >

                        <a>
                        <Header
                            title={student.firstname}
                        />
                        </a>
                        </Link>
                       
                    </div>
                )}





            </>
        </AdminLayout>
    )

}