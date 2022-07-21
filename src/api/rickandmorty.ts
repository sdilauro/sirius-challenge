type Place = {
  name: string
  link: string
}

type Character = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Place
  location: Place
  image: string
  episode: string[]
  created: string
}

export const getCharacters = async (n:number) => {
  const data = await fetch(`https://rickandmortyapi.com/api/character/?page=${n}`)
  const json = await data.json()
  console.log(json)

  if (json.results) {
    return json.results as Character[]
  } else {
    throw new Error(json.reason)
  }
}
