import Link from "next/link"

type StoreProps = {
    status: string
    name: string
    desc?: string
    ulink?: any
}


export default function StoreButton(props: StoreProps) {
    return (

        <div>

            <Link
                href={props.ulink}
            >

                <div className="bg-primary rounded-lg btn-block mt-10 mb-5 pt-5 pb-2 text-white cursor-pointer">

                    <div
                        className="relative"
                    >
                        <div
                            className="rounded-xl text-center text-sm lg:float-right px-5 mx-2  bg-black text-white"
                        >
                            {props.status}
                        </div>

                        <div
                            className=" mx-5"
                        >
                            {props.name}
                        </div>




                        <div
                            className=" mx-5"
                        >
                            {props.desc}
                        </div>
                    </div>

                </div>
            </Link>
        </div>


    )
}