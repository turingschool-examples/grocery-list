import * as API from './apiCalls.js'

describe('API', () => {
  describe('addGrocery', () => {
    let mockGrocery
    let mockGroceries

    beforeEach(() => {
      mockGrocery = { name: 'Cheese', quantity: 5 }
      mockGroceries = [mockGrocery, { name: 'Bread',
        quantity: 6 }]
      window.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockGroceries)
        })
      )
    })

    it('should call fetch with the correct params', () => {
      // Setup
      const expected = [
        '/api/v1/groceries',
        {
          method: 'POST',
          body: JSON.stringify({ grocery: mockGrocery}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ]
      // Execution
      API.addGrocery(mockGrocery)

      // Expectation
      expect(window.fetch).toHaveBeenCalledWith(...expected)
    })

    it('should return us groceries if everything is ok', async () => {
      // Setup
      const expected = mockGroceries

      // Execution
      const result = await API.addGrocery(mockGrocery)

      // Expectation
      expect(result).toEqual(expected)
    })

    it('should throw an error if everything is not ok', async () => {
      // Setup
      const expectedError = Error('Internal server error')
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
        })
      })

      // Execution && Expectation
      await expect(API.addGrocery(mockGrocery)).rejects.toEqual(expectedError)
    })
  })
})
