import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";








/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addStudent(req, res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');
    const { firstname, lastname, email, password, matricno } = JSON.parse(req.body)
    // const hashpassword = await bcrypt.hash(password, 10)

    const isUser = Student.find({ matricno: matricno })

    if (isUser[0] === undefined) {

      const student = await Student.create({
        firstname,
        lastname,
        email,
        password,
        matricno
      });
      console.log('CREATED STUDENT');

      res.json({ student });

    } else {
      res.status(256).json({ message: "user exists" })
    }

  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
