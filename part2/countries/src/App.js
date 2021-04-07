import React, { useState, useEffect } from 'react'
import Country from './component/Country'
import axios from 'axios'

const App = () => {

  const [ infos, setInfos ] = useState([])
  const [ search, setSearch ] = useState('')
  let content = ''

  const hook = () => {
    if (search){
      axios
      .get('https://restcountries.eu/rest/v2/name/' + search)
      .then(response => {
        setInfos(response.data)
      })
    }
  }

  useEffect(hook, [search])

  const handleSearchChange = (event) => {setSearch(event.target.value)}
  const handleButtonClick = (countryName) => {setSearch(countryName)}

  if (infos.length > 10){
    content = 'Too many matches'
  } else if (infos.length === 1) {
    content = <Country info={infos} />
  } else {
    content = infos.map(info => <p key={info.name}>{info.name} <button onClick={() => handleButtonClick(info.name)}>show</button></p>)
  }

  return (
    <div>
      <form>
        find countries <input value={search} onChange={handleSearchChange}/>
      </form>
      {content}
    </div>
  );
}

export default App;
