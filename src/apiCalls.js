export const fetchGroceries = async () => {
  const response = await fetch('/api/v1/groceries')
  if(response.status >= 400) {
    throw(new Error('Error fetching groceries'))
  } else {
    return await response.json()
  }
}
