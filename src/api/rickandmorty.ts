import { Episode } from "../Interfaces"

type Place = {
  name: string
  link: string
}

type Info = {
  count: number
  pages: number
  next: string | null
  prev: string | null
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

type Response = {
  info: Info
  results: Character[]
  error?: string
}

export const getCharacters = async (page: number, name: string) => {
  const data = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
  )
  const json: Response = await data.json()

  if (json.results && json.info) {
    return json as Response
  } else {
    throw new Error(json.error)
  }
}

export const getEpisodes = async (episodes: string) => {
  const data = await fetch(
    `https://rickandmortyapi.com/api/episode/${episodes}`
  )
  const json: Array<Episode> = await data.json()

  if (json.length > 0) {
    return json as Array<Episode>
  } else {
    throw new Error("error")
  }
}
