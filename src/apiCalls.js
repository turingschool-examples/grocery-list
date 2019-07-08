export const addGrocery = grocery => {
  return fetch('/api/v1/groceries', {
    method: 'POST',
    body: JSON.stringify({ grocery }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw Error('Error adding grocery')
      } else {
        return response.json()
      }
    })
}

export const deleteGrocery = id => {}