import { useState } from "react";


type CartInputProps = {
    product: string,
    price: number,
    tot?: number
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

    return (
        <div
            className="w-full"
        >


            <div
                className="grid grid-cols-2"
            >
                <div>
                    {props.product}
                </div>

                <div>
                    {props.price}
                </div>


               {amount}
             
            </div>



            <button
                onClick={() => handleQuantityChange("decrement")}
                className="btn btn-primary" >
                Clicky
            </button>

            <input
                type="number"
                className="bg-red-500"
                value={quantity.toString()}
                min={1}


            />


            <button
                onClick={() => handleQuantityChange("increment")}
                className="btn btn-primary" >
                Clacky
            </button>

        </div>
    )
}