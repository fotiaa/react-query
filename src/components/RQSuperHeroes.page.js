// Combine polling with call backs and use reFetchInterval option to fetch data every 3sec.
// Stop the polling if the length of datanis more than 4 or if we get the error. 

import { useQuery } from "react-query"
import axios from "axios"
import { useState } from "react"


const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {

  const [interval, setInterval] = useState(3000);

  const onSuccess = (data) => {
    if(data.data.length >=4 && interval === 3000)  {
			setInterval(false);
		} 
  }

  const onError = (error) => {
    console.log("perform side effect after error", error ); 
  }

  const {isLoading, data, isError, error } = useQuery('super-heroes', fetchSuperHeroes,
    {
      onSuccess,
      onError,
			refetchInterval: interval,
    }
  )

  if(isLoading){
    return <h2>Loading...</h2>
  }

  if(isError){
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {
        data?.data.map(hero =>{
          return <div key={hero.name}>
            {hero.name}
          </div>
        })
      }
    </>
  )
}

