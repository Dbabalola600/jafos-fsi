import Link from "next/link";


type DashProps = {
    accBal: string | any;
    name: string | any;
    AccId: string | any;

}



export default function UserDash2(props: DashProps) {
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


                {/* <div className="flex items-end space-x-3"> */}

                    <div className=" grid grid-cols-2 lg:grid-cols-1">


                        <div className="text-black   font-bold  text-xl">
                            Available Balance
                        </div>

                        <div
                            className="text-gray-400 text-right lg:text-left"
                        >
                            ₦ {props.accBal}
                        </div>
                    </div>
                {/* </div> */}


            </div>

        </div>
    )
}