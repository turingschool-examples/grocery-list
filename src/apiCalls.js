export const fetchGroceries = async () => {
  const response = await fetch('/api/v1/groceries')

  if(response.status >= 400) {
    throw(new Error('Error fetching groceries'))
  } else {
    return await response.json()
  }
}

export const addGrocery = async (grocery) => {
  const response = await fetch('/api/v1/groceries', {
    method: 'POST',
    body: JSON.stringify({ grocery }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(response.status >= 400) {
    throw(new Error('Error adding grocery'))
  } else {
    return await response.json()
  }
}
