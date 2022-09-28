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
    clickButton?:MouseEventHandler<HTMLDivElement>| any
}


export default function CartInput(props: CartInputProps) {
    const [quantity, setQuantity] = useState<number>(1);

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




        console.log(props.total)
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

    }, [])
    useEffect(() => {
        const existingCart = props.cartList.find(cart => cart._id === props.id)

        if (existingCart) {
            existingCart.quantity = quantity;
            existingCart.amount = amount;
        }





    }, [quantity, amount])







    return (
        <div
            className="w-full"
        >


            <div
                className="grid grid-cols-2 text-black"
            >
                <div>
                    {props.product}
                </div>

                <div>
                    {props.price}
                </div>


                {amount}

            </div>



            <div
                onClick={() => handleQuantityChange("decrement")}

                className="btn btn-primary" >
                Clicky
            </div>

            <input
                type="number"
                className="bg-red-500"
                value={quantity.toString()}
                min={1}
                readOnly


            />


            <div
                onClick={() => handleQuantityChange("increment")}
                className="btn btn-primary"

            >
                Clacky
            </div>
            <div
            onClick={ props.clickButton}
                className="btn btn-primary"
            >
                Delete button
            </div>
        </div>
    )


}