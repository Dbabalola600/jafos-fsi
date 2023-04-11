import Link from "next/link";
import router from "next/router";


type histProps = {
    allLink?: string | any
    creditLink: string | any
    debitLink: string | any
    tokenLink: string | any

    allAmt: any
    debitAmt: any
    creditAmt: any
    tokenAmt: any
}




export default function HistBar(props: histProps) {
    return (
        <div
            className="grid grid-flow-col overflow-x-scroll mt-10 p-5   gap-5  "
        >


            {/* all */}
            {/* <Link
                href={props.allLink}

            >
                <div
                    className={"bg-primary rounded-xl  mx-auto w-28 hover:cursor-pointer hover:bg-black hover:text-white text-black  "}

                >


                    <a
                        className="font-bold mx-2 text-[10px] text-left"
                    >
                        All {"   "} {props.allAmt}


                    </a>



                </div>
            </Link> */}

            <div
                className="btn btn-primary text-white text-center"
                onClick={() => router.push(props.allLink)}
            >

                All {"   "} {props.allAmt}
            </div>



            {/* debit */}




            <div
                className="btn bg-red-500 text-white text-center"
                onClick={() => router.push(props.debitLink)}
            >

                Debit {"   "} {props.debitAmt}
            </div>




            {/* credit */}


            <div
                className="btn bg-green-500 text-white text-center"
                onClick={() => router.push(props.creditLink)}
            >

                Credit {"   "} {props.creditAmt}
            </div>




            {/* token credit */}
            <div
                className="btn bg-orange-500 text-white text-center"
                onClick={() => router.push(props.tokenLink)}
            >

                Token Credit{"     "} {props.tokenAmt}
            </div>




        </div>

    )
}