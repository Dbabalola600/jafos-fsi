import connectMongo from '../../../utils/connectMongo';
import bcrypt from 'bcryptjs'
import Student from '../../../model/Student/StudentModel';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addStudent(req, res) {
  if (req.method === "POST") {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');
    const { firstname, lastname, email, password, matricno } = JSON.parse(req.body)
    // const hashpassword = await bcrypt.hash(password, 10)

    const User = await Student.find({ matricno: matricno })

    console.log(User[0])

    if (User[0] === undefined) {
      const student = await Student.create({
        firstname,
        lastname,
        email,
        password,
        matricno
      });
      console.log('CREATED STUDENT');

      res.status(200).json({ student });

    } else {
      res.status(256).json({ message: "user exists" })
    }


  } else {
    return res.status(400).json({
      message: "wrong request"
    })
  }
}