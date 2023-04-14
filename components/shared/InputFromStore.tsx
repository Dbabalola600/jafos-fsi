
type Props = {
    price: number
    title: string
    category: string
    owner: string
    load: any

}





export default function InputFromStore(props: Props) {
    return (
        <div className="bg-primary rounded-lg p-3 pb-16 ">
            <div className="flex items-end space-x-3 break-words">

                <div className="w-full  text-left relative">


                    <div className="text-black   font-bold text-lg">
                        {props.title}
                    </div>

                    <p
                        className="text-gray-400"
                    >
                        NGN {props.price}
                    </p>
                </div>
            </div>



            <input
                readOnly
                className="hidden"
                defaultValue={props.title}

            />
            <input
                readOnly
                className="hidden"
                defaultValue={props.category}

            />
            <input
                readOnly
                className="hidden"
                defaultValue={props.price}

            />

            <input
                readOnly
                className="hidden"
                defaultValue={props.owner}

            />




            <button

                type="submit"
                className="btn bg-black float-right "
            > {props.load}
            </button>



        </div>
    )
}