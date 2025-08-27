import { User, SortOption } from '../types/User.js'

export const formatFullName = (user: User): string => {
  return `${user.name.first} ${user.name.last}`
}

export const formatAddress = (user: User): string => {
  const { street, city, state, country, postcode } = user.location
  return `${street.number} ${street.name}, ${city}, ${state}, ${country} ${postcode}`
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length >= 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`
  }
  return phone
}

export const filterUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm.trim()) return users

  const term = searchTerm.toLowerCase()
  return users.filter(
    (user) =>
      user.name.first.toLowerCase().includes(term) ||
      user.name.last.toLowerCase().includes(term) ||
      user.location.country.toLowerCase().includes(term)
  )
}

export const sortUsers = (users: User[], sortOption: SortOption): User[] => {
  const sortedUsers = [...users]

  switch (sortOption) {
    case 'nameAsc':
      return sortedUsers.sort((a, b) =>
        formatFullName(a).localeCompare(formatFullName(b))
      )
    case 'nameDesc':
      return sortedUsers.sort((a, b) =>
        formatFullName(b).localeCompare(formatFullName(a))
      )
    case 'countryAsc':
      return sortedUsers.sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    case 'countryDesc':
      return sortedUsers.sort((a, b) =>
        b.location.country.localeCompare(a.location.country)
      )
    default:
      return sortedUsers
  }
}

export const getSortOptionLabel = (sortOption: SortOption): string => {
  switch (sortOption) {
    case 'nameAsc':
      return 'Name (A-Z)'
    case 'nameDesc':
      return 'Name (Z-A)'
    case 'countryAsc':
      return 'Country (A-Z)'
    case 'countryDesc':
      return 'Country (Z-A)'
    default:
      return 'Sort'
  }
}

export const getNextSortOption = (currentSort: SortOption): SortOption => {
  const sortCycle: SortOption[] = [
    'nameAsc',
    'nameDesc',
    'countryAsc',
    'countryDesc',
  ]
  const currentIndex = sortCycle.indexOf(currentSort)
  return sortCycle[(currentIndex + 1) % sortCycle.length]
}

export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
