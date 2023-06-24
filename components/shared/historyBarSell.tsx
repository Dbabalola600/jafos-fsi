import Link from "next/link";
import router from "next/router";


type histProps = {
    allLink?: string | any
    DebLink: string | any
    credLink: string | any

    allAmt: any
    debAmt: any
    credAmt: any
}




export default function HistBarSell(props: histProps) {
    return (
        <div
            className="grid grid-flow-col overflow-x-scroll mt-10 p-5   gap-5  "
        >


           

            <div
                className="btn btn-primary text-white text-center"
                onClick={() => router.push(props.allLink)}
            >

                All {"   "} {props.allAmt}
            </div>



            {/* debit */}




            <div
                className="btn bg-red-500 text-white text-center"
                onClick={() => router.push(props.DebLink)}
            >

                Debit {"   "} {props.debAmt}
            </div>





            {/* token credit */}
            <div
                className="btn bg-green-500 text-white text-center"
                onClick={() => router.push(props.credLink)}
            >

                 Credit{"     "} {props.credAmt}
            </div>




        </div>

    )
}