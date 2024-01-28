import React, { useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner'
import{My_Api_Key} from'./config';
function App() {
  // Declare state for the result
  const [result, setResult] = useState({ originator: { name: '' }, content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      const url = 'https://quotes15.p.rapidapi.com/quotes/random/';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': My_Api_Key,
          'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const resultData = await response.json();
        console.log(resultData);
        console.log(resultData.originator.name);
        console.log(resultData.content);

        // Update the state with the fetched data
        setResult(resultData);

      } catch (error) {
        console.error(error);
      }finally {
        // Set loading to false once the fetch is complete
        setLoading(false);
      }
    };

    // Invoke the fetchApi function
    fetchApi();
  }, []);

  const ReloadButton=()=> {
      window.location.reload();
    };

  return (
    <div>
      {loading ? (
        // Show loading indicator while fetching
        <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#F5F5DC"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
      ) : (
        // Show content once data is loaded
        <>
          <p className='quotes-content'>{result.content}</p>
          <p className='originator'>{result.originator.name}</p>
          <button className='btn' onClick={ReloadButton}>Generate</button>
        </>
      )}
    </div>
  );
}

export default App;