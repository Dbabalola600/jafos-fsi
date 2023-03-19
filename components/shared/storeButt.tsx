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

                <div  className="bg-primary rounded-lg  p-3 hover:bg-primary/80">

                    <div
                        className="items-center justify-center "
                    >
                        <div
                            className="rounded-xl text-center text-sm  bg-black text-white"
                        >
                            {props.status}
                        </div>

                    </div>
                    <div className="flex items-end space-x-3">

                        <div className="w-1/2  text-left relative">


                            <div className="text-black   font-bold text-lg">
                                {props.name}
                            </div>

                            <p
                                className="text-gray-400"
                            >
                                {props.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>


    )
}