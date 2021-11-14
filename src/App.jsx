import { useEffect, useState } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import axios from 'axios'
import './scss/styles.scss'

import Home from './pages/Home'
import Bio from './pages/Bio'

const superheroAccessToken = "10227360787791747"

const characterList = {
  batman: 70,
  penguin: 514,
  scarecrow: 576,
  joker: 370,
  catwoman: 165,
  riddler: 558
}

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetchCharacters()
  }, [])

  const fetchCharacters = async () => {
    try {
      let charList = []
      for (const char in characterList) {
        const res = await axios.get(`api/${superheroAccessToken}/${characterList[char]}`)
        charList = [...charList, res.data]
      }
      setCharacters(charList)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Home characters={characters} />
        </Route>
        <Route patch="bio/:slug" exact>
          <Bio />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
