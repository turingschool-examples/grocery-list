import { addGrocery } from './apiCalls'

describe('addGrocery', () => {
  let mockGrocery
  let mockGroceries

  beforeAll(() => {
    mockGrocery = { name: 'Oranges', quantity: 3 }

    mockGroceries = [
      { name: 'Oranges', quantity: 3 }
    ]
  })

  it('fetch is called with the correct params', () => {

    const expectedParams = [
      "/api/v1/groceries",
      {
        body: JSON.stringify({ grocery: mockGrocery }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    ]

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          groceries: mockGroceries
        })
      })
    })

    addGrocery(mockGrocery)
    expect(window.fetch).toHaveBeenCalledWith(...expectedParams)
  })

  it('returns and object if the status code is ok', () => {
    expect(addGrocery(mockGrocery)).resolves.toEqual({ groceries: mockGroceries})
  })

  it('throws an error if the status code is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 500
    }))

    expect(addGrocery()).rejects.toEqual(Error('Error adding grocery'))
  })
})
