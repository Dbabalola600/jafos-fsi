import connectMongo from "../../utils/connectMongo";
import Student from "../../model/Student/StudentModel";
import Staff from "../../model/Staff/StaffModel"
import Seller from "../../model/Seller/Seller"
import Creder from "../../model/Creder/Creder"
import Admin from "../../model/Admin/AdminModel"

import { setCookie } from "cookies-next";


export default async function Login(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');





        const { name, password } = JSON.parse(req.body)

        const existingStudent = await Student.findOne({ matricno: name })


        // make different error codes for each
        // make failed password the same error code 
        //each success codes should make to the user dash
        // make cookies for each sucessful login


        if (existingStudent === null) {
            const existingStaff = await Staff.findOne({ staffid: name })
            if (existingStaff === null) {
                const existingSeller = await Seller.findOne({ storename: name })
                if (existingSeller === null) {
                    const existingCreder = await Creder.findOne({ creder_no: name })
                    if (existingCreder === null) {

                        const existingAdmin = await Admin.findOne({ AdminId: name })
                        if (existingAdmin === null) {
                            return res.status(402).json("not a user")
                        } else {
                            if (password === existingAdmin.password) {
                                setCookie('Adminuser', existingAdmin._id, { req, res, maxAge: 86400 })
                                return res.status(205).json("admin logged in")

                            } else {
                                return res.status(402).json("invalid password")
                      
                            }
                        }

                    } else {
                        if (password === existingCreder.password) {
                            setCookie('Creduser', existingCreder._id, { req, res, maxAge: 86400 })
                            return res.status(201).json("ayeee creder")
                        } else {
                            return res.status(402).json("invalid password")
                        }
                    }
                } else {
                    if (password === existingSeller.password) {
                        setCookie('Selluser', existingSeller._id, { req, res, maxAge: 86400 })


                        return res.status(202).json("ayeeee seller")
                    } else {
                        return res.status(402).json("invalid3")
                    }
                }
            } else {
                if (password === existingStaff.password) {
                    setCookie('Staffuser', existingStaff._id, { req, res, maxAge: 86400 })//maxage in seconds

                    return res.status(203).json("ayeeee staff")

                } else {
                    return res.status(402).json("invalid2")
                }
            }

        } else {
            if (password === existingStudent.password) {

                setCookie('Normuser', existingStudent._id, { req, res, maxAge: 86400 })
                return res.status(204).json("ayeeee")

            } else {
                return res.status(402).json("invalid2")
            }
        }


    } else {
        return (
            res.status(400).json("error")
        )
    }
}