import Link from "next/link";


type DashProps = {
    accBal: string | any;
    name: string | any;
    AccId: string | any;
  
}



export default function UserDash2(props: DashProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6">

            <div className=" rounded-lg ">

                <div className="text-primary lg:text-3xl  text-lg">
                    Welcome {props.name}{"  "}
                    <p>
                        {props.AccId}
                    </p>


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
                            ₦ {props.accBal}
                        </p>
                    </div>
                </div>

               
            </div>

        </div>
    )
}