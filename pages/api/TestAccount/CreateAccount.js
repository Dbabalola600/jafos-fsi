import connectMongo from "../../../utils/connectMongo"
import User from "../../../model/TEST Account/Users"






export default async function addAccount(req,res){
    try{
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');
        
        console.log('CREATING DOCUMENT');

        const {firstname, lastname, email, password, matricno} = req.body
        // const hashpassword = await bcrypt.hash(password, 10)
        const user = await User.create({
          firstname,
          lastname,
          email,
          password, 
          matricno
        });
        console.log('CREATED ACCOUNT');
    
        res.json({ user });

    }catch (error) {
        console.log(error);
        res.json({ error });
      }
}







