import { useQuery } from "react-query"
import axios from "axios"


const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  // first argument inside useQuery is a unique key and the second arguemnt is a fat arrow function that returns a promise.
  const {isLoading, data, isError, error } = useQuery('super-heroes', fetchSuperHeroes,
    {
      refetchInterval:2000,
      refetchIntervalInBackground:true
    }
  )

// refetchInterval:2000 means query will refetch every 2sec but the refetching will stop if the window loses its focus
// but if we want to refetch data the data even if background loses its focus then set refetchIntervalInBackground to true

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

