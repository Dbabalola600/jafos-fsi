import Link from "next/link";


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
            <Link
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
            </Link>



            {/* debit */}

            <Link
                href={props.debitLink}

            >
                <div
                    className={"bg-red-500 rounded-xl  mx-auto w-28 hover:cursor-pointer hover:bg-black hover:text-white text-black  "}

                >


                    <a
                        className="font-bold mx-2 text-[10px] text-left"
                    >
                        Debit {"   "} {props.debitAmt}


                    </a>



                </div>
            </Link>


            {/* credit */}

            <Link
                href={props.creditLink}

            >
                <div
                    className={"bg-green-500 rounded-xl  mx-auto w-28 hover:cursor-pointer hover:bg-black hover:text-white text-black  "}

                >


                    <a
                        className="font-bold mx-2 text-[10px] text-left"
                    >
                        Credit {"   "} {props.creditAmt}


                    </a>



                </div>
            </Link>



            {/* token credit */}


            <Link
                href={props.tokenLink}

            >
                <div
                    className={"bg-orange-500 rounded-xl  mx-auto w-28 hover:cursor-pointer hover:bg-black hover:text-white text-black  "}

                >


                    <a
                        className="font-bold mx-2 text-[10px] text-left"
                    >
                        TokenCredit{"   "} {props.tokenAmt}


                    </a>



                </div>
            </Link>


        </div>

    )
}