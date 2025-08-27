export interface User {
  id: string
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  location: {
    street: {
      number: number
      name: string
    }
    city: string
    state: string
    country: string
    postcode: string | number
    coordinates: {
      latitude: string
      longitude: string
    }
    timezone: {
      offset: string
      description: string
    }
  }
  email: string
  login: {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
  }
  dob: {
    date: string
    age: number
  }
  registered: {
    date: string
    age: number
  }
  phone: string
  cell: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

export interface RandomUserApiResponse {
  results: User[]
  info: {
    seed: string
    results: number
    page: number
    version: string
  }
}

export type SortOption = 'nameAsc' | 'nameDesc' | 'countryAsc' | 'countryDesc'

export interface AppState {
  users: User[]
  loading: boolean
  error: string | null
  searchTerm: string
  sortOption: SortOption
  selectedUser: User | null
  isModalOpen: boolean
}

