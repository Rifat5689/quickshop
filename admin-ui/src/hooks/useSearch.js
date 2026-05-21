import { useEffect, useState } from 'react'

let globalQuery = ''
let listeners = []

const notify = () => listeners.forEach((listener) => listener(globalQuery))

const useSearch = () => {
  const [query, setQueryState] = useState(globalQuery)

  const setQuery = (nextQuery) => {
    globalQuery = nextQuery
    setQueryState(nextQuery)
    notify()
  }

  useEffect(() => {
    const listener = (nextQuery) => setQueryState(nextQuery)
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((item) => item !== listener)
    }
  }, [])

  return { query, setQuery }
}

export default useSearch
