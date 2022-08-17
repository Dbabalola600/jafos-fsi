import connectMongo from '../../../utils/connectMongo';
import Test from '../../../model/testModel';


//export const getServerSideprops = async () =>
//export default async function fetchtest(getServerSideprops)

export const getServerSideprops = async () =>{
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING DOCUMENTS');
    const tests = await Test.find();
    console.log('FETCHED DOCUMENTS');

    return {
      props: {
        tests: JSON.parse(JSON.stringify(tests)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};