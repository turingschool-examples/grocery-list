export const addGrocery = async (grocery) => {
  const response = await fetch('/api/v1/groceries', {
    method: 'POST',
    body: JSON.stringify({ grocery }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error(`Status ${response.status} returned from server.`);
  }
  const groceries = await response.json();
  return groceries;
}
