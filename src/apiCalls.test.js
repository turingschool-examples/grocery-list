import { fetchGroceries } from './apiCalls'

describe('apiCalls', () => {
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
