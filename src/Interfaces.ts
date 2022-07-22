type Place = {
  name: string
  link: string
}

export interface Character {
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

export interface characterProperty {
  key: string
  value: string
}
