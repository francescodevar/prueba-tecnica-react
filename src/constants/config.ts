export const API_CONFIG = {
  BASE_URL: 'https://randomuser.me/api',
  RESULTS_PER_PAGE: 3,
  TIMEOUT: 10000,
} as const

export const STORAGE_KEYS = {
  USERS: 'user-profile-creator-users',
  SEARCH_TERM: 'user-profile-creator-search',
  SORT_OPTION: 'user-profile-creator-sort',
} as const

export const UI_CONFIG = {
  INFINITE_SCROLL_THRESHOLD: 300,
  THROTTLE_DELAY: 150,
} as const
