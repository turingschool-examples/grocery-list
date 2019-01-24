import API from './api'

describe('API', () => {
  describe('addGrocery', () => {
    let mockGrocery
    let mockGroceries

    beforeEach(() => {
      mockGrocery = { name: 'Potatos', quantity: 1 }
      mockGroceries = [mockGrocery, { name: 'Soup', quantity: 2 }]
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockGroceries),
        ok: true,
      }))
    })

    it('should call fetch with the correct params', () => {
      // setup
      const expected = [
        '/api/v1/groceries',
        {
          method: 'POST',
          body: JSON.stringify({ grocery: mockGrocery }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ]

      // execution
      API.addGrocery(mockGrocery)

      // expectation
      expect(window.fetch).toHaveBeenCalledWith(...expected)
    })

    it('should return groceries if everything is ok', async () => {
      // setup
      const expected = mockGroceries

      // execution
      const result = await API.addGrocery(mockGrocery)

      // expectation
      expect(result).toEqual(expected)
    })

    it('should throw an error if everything is not ok', async () => {
      // setup
      const expectedError = Error('Error fetching data. Code 401')
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 401,
        ok: false,
      }))

      // execution && expectation
      await expect(API.addGrocery(mockGrocery)).rejects.toEqual(expectedError)
    })
  })
})
