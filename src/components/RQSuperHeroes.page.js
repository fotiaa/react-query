import { useQuery } from "react-query"
import axios from "axios"


const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {

// React query automatically injects  the data that has been fetched or the error that has been encountered
  const onSuccess = (data) => {
    console.log("perform side effect after data fetching", data); 
  }

  const onError = (error) => {
    console.log("perform side effect after error", error ); 
  }

  const {isLoading, data, isError, error } = useQuery('super-heroes', fetchSuperHeroes,
    {
      onSuccess,
      onError,
      select : (data) => {
         const superHeroNames = data.data.map( (hero) => hero.name )
         return superHeroNames
      }
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
      {/* { data?.data.map(hero =>{
          return <div key={hero.name}> {hero.name} </div>
      })} */}

      {
        data.map( (heroName) => {
          return <div key={heroName} > {heroName} </div>
        } )
      }
       
    </>
  )
}