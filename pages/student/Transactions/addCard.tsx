import React, { FormEventHandler, useState } from 'react'
import StuLayout from "../Layout/StuLayout";
import Header from "../../../components/shared/Header";
import TextInput from '../../../components/shared/TextInput';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import ErrMess from '../../../components/shared/ErrMess';
import GoodMess from '../../../components/shared/GoodMess';


const AddCard = () => {



    const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })
    const [showtoast, settoast] = useState({ message: "", show: false })

    const router = useRouter()
    const token = getCookie("Normuser")




    const HandleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const form = e.currentTarget.elements as any

        const body = {
            id: token,
            CardNo: form.item(0).value,
            ExpiryDate: form.item(1).value,
            CVV: form.item(2).value,
            pin: form.item(3).value,
        }

        const response = await fetch("/api/student/account/AddCard", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    setgoodtoast({ message: "", show: true })
                    router.push("/student/Transactions/creditAccount")
                } else {
                    settoast({ message: " message", show: true })

                }
            })

        console.log(body)

    }




    return (
        <StuLayout>
            <>
                <Header
                    title="Add new Card"
                />
                <div>

                </div>
                <form
                    // className='grid-cols-12 grid w-full'
                    onSubmit={HandleSubmit}
                >


                    <TextInput name='Credit or Debit Card number' type='number' placeholder={"Enter card number"} />


                    <TextInput name='Expiry Date' type='date' placeholder={"Enter card number"} />


                    <TextInput name='CVV' type='number' placeholder={"***"} />

                    <TextInput name='Card Pin' type='text' placeholder={"****"} />

                    <div className="flex justify-center">
                        <button className="w-full btn-primary btn mt-8 max-w-sm">
                            Submit
                        </button>
                    </div>



                    <div
                        className="mt-10"
                    >
                        {showtoast.show && <ErrMess title="Unknown Error" />}

                        {showgoodtoast.show && <GoodMess title="successfuly" />}

                    </div>


                </form>



            </>
        </StuLayout>
    )
}

export default AddCard