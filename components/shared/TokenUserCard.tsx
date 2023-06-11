import { MouseEventHandler } from "react"


type Myprops = {
    token: string
    amount: any
    // butt: MouseEventHandler<HTMLDivElement> | any
}



export default function TokenUserCard(props: Myprops) {

    return (
        <div className="bg-primary rounded-lg  p-3 ">


            <div className="flex items-end space-x-3">

                <div className="w-1/2  text-left relative">


                    <div className="text-black   font-bold text-lg">
                        Token:  {props.token}
                    </div>

                    <p
                        className="text-gray-400"
                    >
                        Amount:{props.amount}
                    </p>

                </div>
            </div>


            <input

                readOnly
                className="hidden"
                defaultValue={props.token}
            />
            <div
                className="items-center justify-center   "
            >

                <button
                    type="submit"
                    className=" w-full rounded-xl text-center text-sm  bg-gray-200 text-black font-bold hover:bg-black hover:text-gray-200 cursor-pointer "
                // onClick={props.butt}
                >
                    Use Token
                </button>



            </div>



        </div>
    )



}