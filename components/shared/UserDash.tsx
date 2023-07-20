import Link from "next/link";
import Money_Format from "./money_format";


type DashProps = {
    accBal: string | any;
    name: string | any;
    AccId: string | any;
    uLink: string
    wLink: string
}



export default function UserDash(props: DashProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-6">

            <div className=" grid grid-cols-2 lg:grid-cols-1 rounded-lg   lg:text-3xl  text-lg  ">

                <div className="text-primary lg:text-3xl  text-lg">
                    Welcome {props.name}{"  "}
                </div>

                <div
                    className="text-primary text-right lg:text-left"
                >
                    {props.AccId}
                </div>
            </div>




            <div className="bg-primary rounded-lg  p-3">


                <div className="flex items-end space-x-3">

                    <div className=" relative">


                        <div className="text-black   font-bold  text-xl">
                            Available Balance
                        </div>

                        <p
                            className="text-gray-400"
                        >
                            <Money_Format
                                amount={props.accBal}
                            />
                        </p>
                    </div>
                </div>

                <div
                    className="flex justify-between space-x-2"
                >
                    <Link
                        href={props.wLink}
                    >
                        <div
                            className="rounded-xl w-full text-center text-sm  bg-black text-white "
                        >
                            Withdraw
                        </div>

                    </Link>

                    <Link
                        href={props.uLink}
                    >
                        <div
                            className="rounded-xl w-full text-center text-sm  bg-black text-white "
                        >
                            Credit Account
                        </div>

                    </Link>


                </div>
            </div>

        </div>
    )
}