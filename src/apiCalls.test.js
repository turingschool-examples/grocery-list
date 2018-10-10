import * as API from './apiCalls'

describe('API', () => {
  describe('addGrocery', () => {
    let mockGrocery
    let mockGroceries

    beforeEach(() => {
      mockGrocery = { name: 't\'strudels', quantity: '12' }
      mockGroceries = [
        mockGrocery,
        { name: 'oj', quantity: 6 }
      ]
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGroceries)
      }))
    })

    it('should call fetch with the correct params', async () => {
      // Setup
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

      // Execution
      await API.addGrocery(mockGrocery)

      // Expectation
      expect(window.fetch).toHaveBeenCalledWith(...expected)
    })

    it('should return some groceries if status is ok', async () => {
      // Setup 
      const expected = mockGroceries

      // Execution
      const result = await API.addGrocery(mockGrocery)

      // Expectation
      expect(result).toEqual(expected)
    })

    it('throw an error if status is not ok', async () => {
      // Setup
      const expected = Error('Status was not ok')
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
      }))

      // Execution && Expectation
      await expect(API.addGrocery(mockGrocery)).rejects.toEqual(expected)
    })

    it('should throw an error if fetch fails', () => {
    })
  })
})
