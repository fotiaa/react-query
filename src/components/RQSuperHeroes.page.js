import { useQuery } from "react-query"
import axios from "axios"


const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  // first argument inside useQuery is a unique key and the second arguemnt is a fat arrow function that returns a promise.
  const {isLoading, data, isError, error } = useQuery('super-heroes', fetchSuperHeroes,
    {
      staleTime:30000
    }
  )
// Stale time is set to 30s seconds here. In the last scenario we have seen isFetching was true after rendering
// RQSuperHeroesPage component for the second time but when we stale time as 30s then no re-fetching will occur in the 
// background for 30s after this component is re-rendered for the second time.

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

