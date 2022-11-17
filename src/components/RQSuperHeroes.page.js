// step 1 : This is set to to false to inform useQuery not to fetch the data when the component mounts. 
// step 2 : useQuery returns a function called as refetch to manually trigger the query. All we have to do is pass it in as 
//          onClick handler.

import { useQuery } from "react-query"
import axios from "axios"


const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {

  const {isLoading, data, isError, error, isFetching , refetch} = useQuery('super-heroes', fetchSuperHeroes,
    {
      enabled:false
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
      <button onClick={refetch}> Fetch Heroes </button>
      {data?.data.map(hero =>{
        return <div key={hero.name}>
          {hero.name}
        </div>
      })}
    </>
  )
}

