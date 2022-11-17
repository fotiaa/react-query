import { useQuery } from "react-query"
import axios from "axios"


const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  // first argument inside useQuery is a unique key and the second arguemnt is a fat arrow function that returns a promise.
  const {isLoading, data, isError, error, isFetching } = useQuery('super-heroes', fetchSuperHeroes,
    {
        refetchOnMount: true,
    //  refetchOnMount: false
    //  refetchOnMount: 'always'

        refetchOnWindowFocus: true
    //  refetchOnWindowFocus: false
    //  refetchOnWindowFocus: 'always'
    }
  )
// Default value of refetchOnMount is set to true, that means that query will refetch the data everytime componenet mounts.
// If it is set to false then is fetching will be false after the first rendering.refetchOnMount also accepts a string 'always'.

// refetchOnWindowFocus is set to true meaning anytime your tab loses focus and gains focus again background focus is 
// reinitiated and when the reftech gets completed the UI is updated with data retrieved.

  console.log({isLoading,isFetching})

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

