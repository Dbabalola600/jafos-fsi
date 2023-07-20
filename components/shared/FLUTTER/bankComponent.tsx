import axios from 'axios';
import useSWR from 'swr';

interface Bank {
  name: string;
  // Add other properties if available in the response data
}

const fetcher = async (url: string) => {
  const headers = {
    'Content-Type': 'application/json',
    'sandbox-key': "6td1t2Xh0f0azt6vLQrsq8vyxNLTzImb1689594655",
    'Authorization': 'dskjdks'
  }



  const response = await axios.get(url, { headers });
  return response.data;
};

const BankComponent: React.FC = () => {
  const { data: bankData, error } = useSWR<{ data: Bank[] }>(
    `https://fsi.ng/api/v1/flutterwave/v3/banks/NG?country=NG`,
    fetcher,
    {
      revalidateOnMount: true,
      refreshInterval: 60000, // Optional: Set the interval to refresh the data (in ms)
    }
  );

  if (error) {
    console.error(error);
    return <div
      className="form-control w-full max-w-xs mx-auto"
    >
      <label>
        <span className="label-text text-black  text-base">Bank Name</span>
      </label>
      <select className="select select-primary mt-3  max-w-xs w-full ">


        <option

        >
          {"unable to fetch"}
        </option>




      </select>
    </div>;
  }

  if (!bankData) {
    return <div>Loading...</div>;
  }

  const bankNames = bankData.data.map((bank) => bank.name);

  return (





    <div
      className="form-control w-full max-w-xs mx-auto"
    >
      <label>
        <span className="label-text text-black  text-base">Bank Name</span>
      </label>
      <select className="select select-primary mt-3  max-w-xs w-full ">


        {bankNames.map((name, index) => (
          <option
            key={index}
          >
            {name}
          </option>
        ))}



      </select>
    </div>


  );
};

export default BankComponent;