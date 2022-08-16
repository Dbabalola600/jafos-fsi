import connectMongo from '../../../utils/connectMongo';

import Student from '../../../model/StudentModel';

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
    const {firstname, lastname, email, password, matricno} = JSON.parse(req.body)
    
    const student = await Student.create({
      firstname,
      lastname,
      email,
      password, 
      matricno
    });
    console.log('CREATED STUDENT');

    res.json({ student });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}