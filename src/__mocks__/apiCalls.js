export const fetchGroceries = jest.fn()
  .mockImplementationOnce(() => ({
    groceries: [
      { id: 1489863729151, name: 'Rutabagas', quantity: 10, purchased: false, starred: false },
      { id: 1489863740047, name: 'Beef Jerky', quantity: 1000, purchased: false, starred: false },
    ],
  }))
  .mockImplementationOnce(() => {
    throw(new Error('Error fetching groceries'))
  })

export const addGrocery = jest.fn()
  .mockImplementationOnce(() => ({
    groceries: [
      { id: 1489863729151, name: 'Rutabagas', quantity: 10, purchased: false, starred: false },
      { id: 1489863740047, name: 'Beef Jerky', quantity: 1000, purchased: false, starred: false },
    ],
  }))
  .mockImplementationOnce(() => ({
    groceries: [
      { id: 1489863729151, name: 'Rutabagas', quantity: 10, purchased: false, starred: false },
      { id: 1489863740047, name: 'Beef Jerky', quantity: 1000, purchased: false, starred: false },
    ],
  }))
