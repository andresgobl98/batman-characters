import { useReducer, useCallback } from 'react'
import constate from 'constate'
import axios from 'axios'

const superheroAccessToken = "10227360787791747"

const characterList = {
  batman: '69',
  penguin: '514',
  scarecrow: '576',
  joker: '370',
  catwoman: '165',
  riddler: '558'
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_HEROES':
      return { ...state, characters: action.payload}
    default:
      return state
  }
}

const initialState = {
  characters: []
}

const useAppState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchCharacters = useCallback(async () => {
    try {
      let charList = []
      for (const char in characterList) {
        axios.get(`https://superheroapi.com/api/${superheroAccessToken}/search/${char}`)
          .then(res => {
            console.log(res)
          })
      }
      dispatch({ type: 'SET_CHARACTERS', payload: []})
    } catch (error) {
      console.error(error)
    }
  }, [dispatch])

  return {
    ...state,
    fetchCharacters
  }
}

const [AppStateProvider, useAppStateContext] = constate(useAppState)

export { AppStateProvider, useAppStateContext }