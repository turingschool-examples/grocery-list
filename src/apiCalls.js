export const addGrocery = async (grocery) => {
  const response = await fetch('/api/v1/groceries', {
    method: 'POST',
    body: JSON.stringify({ grocery }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(response.ok) {
    return await response.json()
  } else {
    throw new Error('Status was not ok')
  }
}
