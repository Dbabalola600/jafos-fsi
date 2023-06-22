import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import AdminLayout from "../Layout/AdminLayout";
import useSWR from 'swr'

type Data = {
    pagination: {
        count: number
        pageCount: number
    }
    students: {
        _id: string
        firstname: string
        matricno: string
        lastname: string
    }[]

}


type Pagination = {
    count: number
    pageCount: number
}
type Students = {
    _id: string
    firstname: string
    matricno: string
    lastname: string
}[]


const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());


export default function Index() {
    // const [data, SetData] = useState<Data>()
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)



    const { data, error } = useSWR(
        `/api/admin/student/fetchStudent?page=${page}`,

        fetcher
    )

    // const showinfo = async () => {
    //     const StudentResponse = await fetch("/api/admin/student/fetchStudent", { method: "Get" })
    //         .then(res => res.json()) as Students[]

    //     SetStudents(StudentResponse)

    // }





    const showinfo = async () => {
        const StudentResponse = await fetch(`/api/admin/student/fetchStudent?page=${page}`, { method: "Get" })
            .then(res => res.json()) as Data

        // SetData(StudentResponse)
        // console.log(StudentResponse)

    }



    // useEffect(() => {
    //     showinfo()
    // }, [])

    // console.log(data.students)


    const search: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const form = e.currentTarget.elements as any

        router.push(`/ADMIN2823/Students/find/${form.item(0).value}`)
    }



    function handlePrevious() {
        setPage((p) => {
            if (p === 1) return p
            else {
                return p - 1;
            }

        })
    }

    function handleNext() {
        setPage((p) => {
            if (p === pageCount) return p;
            else {
                return p + 1;
            }

        })
    }


    useEffect(() => {
        if (data) {
            setPageCount(data.pagination.pageCount)
        }
    }, [data])


    return (
        <AdminLayout>
            <>

                <div className="grid grid-cols-2 space-x-10">

                    <Header
                        title="All Students"
                    />


                    <div className='  mx-auto'>
                        <Link
                            href="/ADMIN2823/Students/newStudent">
                            <button className="btn btn-lg btn-primary btn-block">
                                Add Student
                            </button>
                        </Link>
                    </div>

                </div>




                <form
                    onSubmit={search}

                >


                    <div className="flex justify-center">
                        <div className="mb-3 xl:w-96 mt-5">
                            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                <input
                                    type="search"
                                    className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-black font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="button-addon3"


                                />
                                <button


                                    className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                                    type="submit"
                                    id="button-addon3"
                                    data-te-ripple-init>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>


                </form>







                <div
                    className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6"

                >


                    {data?.students.map((student: {

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

                                <div className="bg-primary rounded-lg  p-3 hover:bg-primary/80">


                                    <div className="flex items-end space-x-3">

                                        <div className="w-1/2  relative">


                                            <div className="text-black   font-bold text-lg">
                                                {student.firstname} {student.lastname}
                                            </div>

                                            <p
                                                className="text-gray-400"
                                            >
                                                {student.matricno}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>






                        </div>
                    )}


                </div>


                <div
                    className="mt-5 space-x-5 text-black"
                >



                    <button
                        disabled={page === 1}
                        onClick={handlePrevious}
                        className="bg-black rounded-lg text-white p-3"
                    >
                        Previous
                    </button>
                    Page: {page}


                    <button
                        disabled={page === pageCount}
                        onClick={handleNext}
                        className="bg-black rounded-lg text-white p-3"
                    >
                        Next
                    </button>
                </div>




            </>
        </AdminLayout>
    )

}