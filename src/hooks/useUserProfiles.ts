import { useState, useEffect, useCallback } from 'react'
import { User, SortOption } from '../types/User.js'
import { userApi } from '../services/api.js'
import { storage } from '../utils/storage.js'
import { filterUsers, sortUsers, generateUniqueId } from '../utils/helpers.js'
import { useInfiniteScroll } from './useInfiniteScroll.js'
import { UI_CONFIG } from '../constants/config.js'

const useMinimumLoadingDuration = () => {
  const executeWithMinDuration = async (
    asyncOperation: () => Promise<void>,
    setLoadingState: (loading: boolean) => void,
    minDuration: number = 900
  ) => {
    const startTime = Date.now()

    try {
      await asyncOperation()
    } finally {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, minDuration - elapsedTime)

      if (remainingTime > 0) {
        setTimeout(() => {
          setLoadingState(false)
        }, remainingTime)
      } else {
        setLoadingState(false)
      }
    }
  }

  return { executeWithMinDuration }
}

interface UserProfilesState {
  users: User[]
  loading: boolean
  loadingMore: boolean
  loadingMoreButton: boolean
  loadingNewProfile: boolean
  error: string | null
  searchTerm: string
  sortOption: SortOption
  selectedUser: User | null
  isModalOpen: boolean
  currentPage: number
}

const initialState: UserProfilesState = {
  users: [],
  loading: false,
  loadingMore: false,
  loadingMoreButton: false,
  loadingNewProfile: false,
  error: null,
  searchTerm: '',
  sortOption: 'nameAsc',
  selectedUser: null,
  isModalOpen: false,
  currentPage: 1,
}

export const useUserProfiles = () => {
  const [state, setState] = useState<UserProfilesState>(initialState)

  const { executeWithMinDuration } = useMinimumLoadingDuration()

  const updateState = useCallback((updates: Partial<UserProfilesState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  const fetchInitialUsers = useCallback(async () => {
    updateState({ loading: true, error: null })

    try {
      const response = await userApi.getUsers(3)
      const usersWithIds = response.results.map((user) => ({
        ...user,
        id: user.login.uuid || generateUniqueId(),
      }))
      updateState({ users: usersWithIds, currentPage: 1 })
    } catch (err) {
      updateState({
        error: err instanceof Error ? err.message : 'Failed to fetch users',
      })
    } finally {
      updateState({ loading: false })
    }
  }, [updateState])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUsers = storage.loadUsers()
    const savedSearchTerm = storage.loadSearchTerm()
    const savedSortOption = storage.loadSortOption()

    updateState({
      searchTerm: savedSearchTerm,
      sortOption: savedSortOption,
    })

    if (savedUsers.length > 0) {
      updateState({ users: savedUsers })
    } else {
      fetchInitialUsers()
    }
  }, [updateState, fetchInitialUsers])

  useEffect(() => {
    if (state.users.length > 0) {
      storage.saveUsers(state.users)
    }
  }, [state.users])

  useEffect(() => {
    storage.saveSearchTerm(state.searchTerm)
  }, [state.searchTerm])

  useEffect(() => {
    storage.saveSortOption(state.sortOption)
  }, [state.sortOption])

  const generateNewProfile = async () => {
    updateState({ loadingNewProfile: true, error: null })

    await executeWithMinDuration(
      async () => {
        const response = await userApi.getUsers(1)
        const newUser = {
          ...response.results[0],
          id: response.results[0].login.uuid || generateUniqueId(),
        }

        setState((prevState) => {
          const userExists = prevState.users.some(
            (user) => user.login.uuid === newUser.login.uuid
          )
          if (userExists) {
            const uniqueUser = {
              ...newUser,
              id: generateUniqueId(),
              login: {
                ...newUser.login,
                uuid: generateUniqueId(),
              },
            }
            return { ...prevState, users: [...prevState.users, uniqueUser] }
          }
          return { ...prevState, users: [...prevState.users, newUser] }
        })
      },
      (loading) => updateState({ loadingNewProfile: loading }),
      300
    ).catch((err) => {
      updateState({
        error:
          err instanceof Error ? err.message : 'Failed to generate new profile',
        loadingNewProfile: false,
      })
    })
  }

  const loadMoreProfiles = async (isFromButton: boolean = false) => {
    if (isFromButton) {
      updateState({ loadingMoreButton: true })
    } else {
      updateState({ loadingMore: true })
    }
    updateState({ error: null })

    const minDuration = isFromButton ? 300 : 900

    await executeWithMinDuration(
      async () => {
        const nextPage = state.currentPage + 1
        const response = await userApi.getUsersWithOffset(3, nextPage)
        const newUsers = response.results.map((user) => ({
          ...user,
          id: user.login.uuid || generateUniqueId(),
        }))

        setState((prevState) => {
          const uniqueNewUsers = newUsers.map((newUser) => {
            const userExists = prevState.users.some(
              (existingUser) => existingUser.login.uuid === newUser.login.uuid
            )
            if (userExists) {
              return {
                ...newUser,
                id: generateUniqueId(),
                login: {
                  ...newUser.login,
                  uuid: generateUniqueId(),
                },
              }
            }
            return newUser
          })

          return {
            ...prevState,
            users: [...prevState.users, ...uniqueNewUsers],
            currentPage: nextPage,
          }
        })
      },
      (loading) =>
        updateState(
          isFromButton
            ? { loadingMoreButton: loading }
            : { loadingMore: loading }
        ),
      minDuration
    ).catch((err) => {
      updateState({
        error:
          err instanceof Error ? err.message : 'Failed to load more profiles',
        loadingMoreButton: false,
        loadingMore: false,
      })
    })
  }

  const deleteUser = useCallback((userId: string) => {
    setState((prevState) => {
      const updatedUsers = prevState.users.filter(
        (user) => user.login.uuid !== userId
      )
      const shouldCloseModal = prevState.selectedUser?.login.uuid === userId

      return {
        ...prevState,
        users: updatedUsers,
        selectedUser: shouldCloseModal ? null : prevState.selectedUser,
        isModalOpen: shouldCloseModal ? false : prevState.isModalOpen,
      }
    })
  }, [])

  const deleteAllUsers = useCallback(() => {
    updateState({
      users: [],
      selectedUser: null,
      isModalOpen: false,
    })
    storage.saveUsers([])
  }, [updateState])

  const viewUser = useCallback(
    (user: User) => {
      updateState({
        selectedUser: user,
        isModalOpen: true,
      })
    },
    [updateState]
  )

  const closeModal = useCallback(() => {
    updateState({
      isModalOpen: false,
      selectedUser: null,
    })
  }, [updateState])

  const retryFetch = () => {
    fetchInitialUsers()
  }

  const filteredUsers = filterUsers(state.users, state.searchTerm)
  const displayUsers = sortUsers(filteredUsers, state.sortOption)

  useInfiniteScroll({
    onLoadMore: () => loadMoreProfiles(false),
    isLoading: state.loadingMore,
    hasItems: state.users.length > 0,
    threshold: UI_CONFIG.INFINITE_SCROLL_THRESHOLD,
    enabled: true,
  })

  return {
    users: displayUsers,
    loading: state.loading,
    loadingMore: state.loadingMore,
    loadingMoreButton: state.loadingMoreButton,
    loadingNewProfile: state.loadingNewProfile,
    error: state.error,
    searchTerm: state.searchTerm,
    sortOption: state.sortOption,
    selectedUser: state.selectedUser,
    isModalOpen: state.isModalOpen,
    hasUsers: state.users.length > 0,
    userCount: filteredUsers.length,
    setSearchTerm: (searchTerm: string) => updateState({ searchTerm }),
    setSortOption: (sortOption: SortOption) => updateState({ sortOption }),
    generateNewProfile,
    loadMoreProfiles,
    deleteUser,
    deleteAllUsers,
    viewUser,
    closeModal,
    retryFetch,
  }
}
