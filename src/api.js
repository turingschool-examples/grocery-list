const addGrocery = async (grocery) => {
  const response = await fetch('/api/v1/groceries',
    {
      method: 'POST',
      body: JSON.stringify({ grocery }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (response.ok) {
    return response.json()
  } else {
    throw Error(`Error fetching data. Code ${response.status}`)
  }
}

export default {
  addGrocery,
}
