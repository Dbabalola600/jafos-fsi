import { MouseEventHandler } from "react"



type MyProps = {
    product: string
    amount: any
    quantity: any
    status: any
    DelclickButton?: MouseEventHandler<HTMLDivElement> | any
    PayclickButton :  MouseEventHandler<HTMLDivElement> | any
}




export default function CheckOutInfoPay(props: MyProps) {
    return (
        <div className="bg-primary rounded-lg p-3 pb-5 ">
            <div className="flex items-end break-words  text-white">

                <div className="w-full  grid grid-cols-1 lg:grid-cols-2    text-left relative">


                    <p className="">
                        {props.product}
                    </p>

                    <p
                        className=""
                    >
                        NGN {props.amount}
                    </p>


                    <p
                        className=""
                    >
                     {props.status}
                    </p>
                    <p
                    >
                        Quantity:   {props.quantity}
                    </p>
                </div>
            </div>


            <div
                className=" grid lg:grid-cols-2  gap-6 pt-5 grid-cols-1"
            >
                {/* <div
                    className="btn bg-black float-right text-white "
                    onClick={props.DelclickButton}
                > Delete
                </div> */}



                <div
                 
                    className="btn bg-white float-right text-black hover:bg-white "
                    onClick={props.DelclickButton}
                > Pay
                </div>
            </div>




        </div>
    )
}