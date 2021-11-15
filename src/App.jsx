import { useEffect, useState } from 'react'
import axios from 'axios'
import './scss/styles.scss'

import Home from './pages/Home'

import CharacterList from './queryData/charList'

const superheroAccessToken = "10227360787791747"

function App() {
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetchCharacters()
  }, [])

  const fetchCharacters = async () => {
    setLoading(true)
    try {
      let charList = []
      
      for (const char in CharacterList) {
        const randomNumber = Math.random().toFixed(1)
        let hidden = false
        randomNumber <= 0.7 && (hidden = true)
        const res = await axios.get(`api/${superheroAccessToken}/${CharacterList[char]}`)
        charList = [...charList, {...res.data, selected: false, hidden: hidden}]
      }
      setCharacters(charList)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <Home characters={characters} loading={loading} />
    </div>
  );
}

export default App;
