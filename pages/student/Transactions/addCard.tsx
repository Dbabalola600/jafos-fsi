import React from 'react'
import StuLayout from "../Layout/StuLayout";
import Header from "../../../components/shared/Header";
import TextInput from '../../../components/shared/TextInput';
type Props = {}

const addCard = (props: Props) => {
  return (
    <StuLayout>
                <>
                    <Header
                        title="Add new Card"
                    />
            <div>
              
            </div>
                <div className='grid-cols-12 grid w-full'>
                    <div className='col-span-12 w-full'>
                        <TextInput name='credit or debit card number' type='number' placeholder={"Enter card number"}/>
                    </div>
                    <div className='col-span-6 '>
                        <TextInput  name='Expiry Date' type='date' placeholder={"Enter card number"}/>
                    </div>
                    <div className='col-span-6 '>
                        <TextInput  name='CVV' type='number' placeholder={"***"}/>
                    </div>
                    <div className='col-span-12 w-full'>
                        <TextInput name='Billing Address' type='text' placeholder={"select your address"}/>
                    </div>
                </div>         
                   
                </>
            </StuLayout>
  )
}

export default addCard