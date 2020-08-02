import React from 'react'

const TokensViewer = ({ valueGroups }) => {
  return (
    <div>
      <h3>Tokens</h3>
      <ul>
        {Object.entries(valueGroups).map(([groupId, values]) => (
          <li key={groupId}>
            <h2>{groupId}</h2>
            <ul>
              {values.map((value) => (
                <li key={value.id}>
                  <b>{value.name}:</b>
                  {value.body}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TokensViewer
