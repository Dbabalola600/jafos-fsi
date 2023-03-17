import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Header from "../../../components/shared/Header"
import AdminLayout from "../Layout/AdminLayout"


type Staff ={
    _id: string
    firstname: string
    staffid: string
    lastname: string
}






export default function Index() {
    const [staffs, SetStaffs] = useState<Staff[]>([])
    const router = useRouter()



    const showinfo = async () => {
        const StaffResponse = await fetch("/api/admin/staff/fetchStaff", { method: "Get" })
            .then(res => res.json()) as Staff[]

        SetStaffs(StaffResponse)

    }


    useEffect(() => {
        showinfo()
    }, [])


    return (
        <AdminLayout>
            <>
                <Header
                    title=" This displays all the staffs "
                />





                <div className='  mx-auto'>
                    <Link
                        href="/ADMIN2823/Staff/newStaff">
                        <button className="btn btn-lg btn-primary btn-block">
                            Add Staff
                        </button>
                    </Link>
                </div>

                {staffs.map((staff: {
                    _id: string
                    firstname: string
                    staffid: string
                    lastname: string
                }) =>
                    <div
                        key={staff._id}
                    >
                        <Link
                        href={`/ADMIN2823/Staff/${staff._id}`}
                        >

                        <a>
                        <Header
                            title={staff.firstname}
                        />
                        </a>
                        </Link>
                       
                    </div>
                )}





            </>
        </AdminLayout>
    )

}