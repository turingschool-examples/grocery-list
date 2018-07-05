import { addGrocery } from './ApiCalls'

describe('ApiCalls', () => {
  describe('addGrocery', () => {

    let mockGrocery
    let mockGroceries

    beforeEach(() => {
      mockGrocery = { name: 'grapes', quantity: 35 }
      mockGroceries = [ mockGrocery, { name: 'avocados', quantity: 4 } ]
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockGroceries),
        ok: true
      }))
    })

    it('should call fetch with the correct params', async () => {
      // Setup
      const expectedParams = [
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
      await addGrocery(mockGrocery)

      // Expectation
      expect(window.fetch).toHaveBeenCalledWith(...expectedParams)
    })

    it('should return an array of groceries if all is well', async () => {
      // Setup
      const expected = mockGroceries

      // Execution
      const result = await addGrocery(mockGrocery)

      // Expectation
      expect(result).toEqual(expected)
    })

    it('should throw an error if the response is not ok', async () => {
      // Setup
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false
      }))

      // Execution & Expectation
      await expect(addGrocery(mockGrocery)).rejects.toEqual(Error('failed fetch'))
    })

    it('should throw an error if fetch fails', async () => {
      // Setup
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('failure')))

      // Execution & Expectation
      await expect(addGrocery(mockGrocery)).rejects.toEqual(Error('failure'))
    })
  })
})
