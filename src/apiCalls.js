export const addGrocery = async (grocery) => {
  const response = await fetch('/api/v1/groceries',
                              {
                                body: JSON.stringify({ grocery }),
                                headers: {
                                  "Content-Type": "application/json"
                                },
                                method: "POST"
                              }
  )
  if(response.status <= 200) {
    return await response.json()
  } else {
    throw(new Error('Error adding grocery'))
  }
}
