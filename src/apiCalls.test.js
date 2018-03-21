import { addGrocery } from './apiCalls'

describe('API calls', () => {

  describe('addGrocery', () => {

    let mockGrocery

    beforeEach(() => {
      mockGrocery = { name: 'spam', quantity: 5000 }
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockGrocery])
      }))
    })

    it('calls fetch with the correct params', () => {
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

      addGrocery(mockGrocery)
      expect(window.fetch).toHaveBeenCalledWith(...expected)
    })

    it('returns an array of groceries if the status is ok', async () => {
      await expect(addGrocery(mockGrocery)).resolves.toEqual([mockGrocery])
    })

    it('throws an error if the status is not ok', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
      }))
      await expect(addGrocery(mockGrocery)).rejects.toEqual(Error('an error happened'))
    })

  })

})
