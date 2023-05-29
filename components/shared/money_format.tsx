

type amount = {
    amount: number| any
}



export default function Money_Format(props: amount) {

   const Formater = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "ngn"
    });
  
    // return amount

   const N_amount = Formater.format(props.amount)


    return (
        <>
            {N_amount}
        </>
    )

}

