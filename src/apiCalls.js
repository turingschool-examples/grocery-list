export const addGrocery = async (grocery) => {
  const response = await fetch('/api/v1/groceries',
    {
      method: 'POST',
      body: JSON.stringify({ grocery }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if(response.ok) {
    const groceries = await response.json()
    return groceries
  } else {
    throw new Error('Internal server error')
  }
}
