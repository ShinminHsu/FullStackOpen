import React from 'react'

const Country = ({info}) => {
    return (
      <div>
        <h1>{info[0].name}</h1>
        <p>capital {info[0].capital}</p>
        <p>population {info[0].population}</p>
  
        <h2>languages</h2>
        <ul>
          {info[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={info[0].flag} alt='Flag' width="30%" height="30%"/>
      </div>
    )
  }

export default Country