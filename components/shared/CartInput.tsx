import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";



import { cartListType } from "../../pages/student/Cart";


type CartInputProps = {
    product: string,
    price: number,
    setCartList: Dispatch<SetStateAction<cartListType>>
    cartList: cartListType,
    id: string;
    storename: string
    index: number
    total?: number
    clickButton?: MouseEventHandler<HTMLDivElement> | any
}


export default function CartInput(props: CartInputProps) {
    const [quantity, setQuantity] = useState<number>(1);
    // const [total, setTotal] = useState<number | null>()


    const handleQuantityChange = (changeType: "increment" | "decrement") => {
        if (changeType === "increment") {
            setQuantity((prevState) => (prevState + 1));
        } else {
            if (quantity === 1) {
                return;
            } else {
                setQuantity((prevState) => (prevState - 1));

            }

        }
    }


    let amount = quantity * props.price;




    useEffect(() => {
        const existingCart = props.cartList[props.index]





        if (!existingCart) {
            props.setCartList((prev) => {
                prev[props.index] = {
                    product: props.product,
                    _id: props.id,
                    amount,
                    storename: props.storename,
                    price: props.price,
                    quantity,
                    title: props.product,
                    total: props.total
                }

                return prev

            })
        }


        // let total = (props.cartList[0].amount) + (props.cartList[1].amount)


    }, [])



    useEffect(() => {
        const existingCart = props.cartList.find(cart => cart._id === props.id)

        if (existingCart) {
            existingCart.quantity = quantity;
            existingCart.amount = amount;
        }




    }, [quantity, amount])



    // console.log(props.cartList[0].amount)



    return (
        <div className="bg-primary rounded-lg p-3 pb-10 lg:pb-20 ">




            <div className="flex items-end space-x-3 break-words">

                <div className="w-full  text-left relative">


                    <div className="text-black   font-bold text-lg">
                        {props.product}
                    </div>

                    <p
                        className="text-gray-400"
                    >
                        NGN {amount}
                    </p>
                </div>
            </div>



            <div
                className="w-1/2 grid grid-cols-3 lg:grid-cols-3 space-x-2 items-center lg:items-start"
            >


                <div
                    onClick={() => handleQuantityChange("decrement")}

                    className="rounded-lg lg:w-10 w-5  bg-red-500 text-black text-center lg:text-3xl text-lg hover:cursor-pointer border-black border-2  " >
                    -
                </div>

                <div
                    className="bg-white lg:pt-3  pt-1 lg:w-10 w-5 item-center rounded-lg hover:bg-white hover:cursor-default text-center text-black"
                >
                    {quantity.toString()}
                </div>


                <div
                    onClick={() => handleQuantityChange("increment")}

                    className="rounded-lg lg:w-10 w-5  bg-green-500 text-black text-center lg:text-3xl text-lg hover:cursor-pointer border-black border-2  " >
                    +
                </div>

                {/* <div
                                // onClick={props.clickButton}
                                className="btn btn-red-500"
                            >
                                Delete button
                            </div> */}
                <input
                    type="number"
                    className="bg-white hidden text-center text-black"
                    value={quantity.toString()}
                    min={1}
                    readOnly


                />




            </div>
            <div
                onClick={props.clickButton}
                className="btn bg-black lg:float-right   mt-5 "
            >
                Delete
            </div>
        </div>
    )


}