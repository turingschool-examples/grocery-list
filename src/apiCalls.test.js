import { addGrocery } from './apiCalls'

describe('addGrocery', () => {
  let mockGrocery
  let mockGroceries

  beforeEach(() => {
    mockGrocery = { name: 'bananas', quantity: '4' }
    mockGroceries = [
      { name: 'bananas', quantity: '4' },
      { name: 'zucchini', quantity: '6' }
    ]
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGroceries)
      })
    })
  })

  it('should call fetch with the correct params', () => {
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
    addGrocery(mockGrocery)

    // Expectation
    expect(window.fetch).toHaveBeenCalledWith(...expected)
  })

  it('returns an array if the response is ok', async () => {
    // Setup
    const expected = mockGroceries

    // Execution
    const result = await addGrocery(mockGrocery)

    // Expectation
    expect(result).toEqual(expected)
  })

  it('throws an error if the fetch fails', async () => {
    // Setup
    const expected = new Error('failed to fetch')
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(new Error('failed to fetch'))
    })

    // Execution && Expectation
    await expect(addGrocery(mockGrocery)).rejects.toEqual(expected)
  })

  it('throw an error if the status is not ok', async () => {
    // Setup
    const expected = new Error('status was not ok')
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    
    // Execution && Expectation
    await expect(addGrocery(mockGrocery)).rejects.toEqual(expected)
  })
})
