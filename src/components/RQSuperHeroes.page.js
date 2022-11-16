import { useQuery } from "react-query"
import axios from "axios"


const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
// first argument inside useQuery is a unique key and the second arguemnt is a fat arrow function that returns a promise.
// Third argument is an object where we can configure multiple properties in which cache time is one of them.
  const {isLoading, data, isError, error, isFetching } = useQuery('super-heroes', fetchSuperHeroes)

// when RQSuperHeroesPage is rendered first isLoading and isFetching both them are true when the fetching is complete both are set
// to false. If we try re-render this component then this time isLoading is false then isFetching is true, when the fetching 
// gets completed isLoading and isFetching both are set to true and if the data gets updated between the first and second
// render then isFetching updates the changed data, that's why during second rendering isFetching is true while isLoading
// is true as React query has inbuilt cache memory(by default 5 minutes).

//
  console.log({isLoading, isFetching});

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

