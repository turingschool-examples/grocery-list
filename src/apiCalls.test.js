import { addGrocery, fetchGroceries } from './apiCalls'

describe('apiCalls', () => {
  describe('fetchGroceries', () => {
    it('returns an object if status code is ok', () => {
      window.fetch = jest.fn().mockImplementation(() => ({
        status: 200,
        json: () => new Promise((resolve, reject) => {
          resolve({
            groceries: [],
          })
        }),
      }))

      expect(fetchGroceries()).resolves.toEqual({ groceries: [] })
    })

    it('throws an error if status code is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => ({
        status: 500,
      }))

      expect(fetchGroceries()).rejects.toEqual(Error('Error fetching groceries'))
    })
  })

  describe('addGrocery', () => {
    const mockGroceries = [
      {id: 1, name: 'Pineapples', quantity: 10},
      {id: 2, name: 'Oranges', quantity: 3}
    ]

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => new Promise((resolve, reject) => {
          resolve({
            groceries: mockGroceries,
          })
        }),
      }))
    })

    it('fetch is called with the correct params', async () => {
      const mockGrocery = {name: 'Oranges', quantity: 3}
      const expected = [
        "/api/v1/groceries", 
        {
          body: JSON.stringify({ grocery: mockGrocery }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        }
      ]

      addGrocery(mockGrocery)
      expect(window.fetch).toHaveBeenCalledWith(...expected)
    })

    it('returns an object if status code is ok', () => {
      const mockGrocery = {name: 'Oranges', quantity: 3}
      expect(addGrocery(mockGrocery)).resolves.toEqual({groceries: mockGroceries})
    })

    it('throws an error if status code is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500,
      }))

      expect(addGrocery()).rejects.toEqual(Error('Error adding grocery'))
    })
  })
})
