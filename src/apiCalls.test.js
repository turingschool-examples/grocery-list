import { addGrocery } from './apiCalls';

describe('addGrocery', () => {
  let mockGrocery;
  let mockGroceriesResponse;

  beforeEach(() => {
    mockGrocery = { name: 'ice cream', quantity: 1 };
    mockGroceriesResponse = [
      { name: 'waffle cones', quantity: 10 },
      mockGrocery
    ];
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGroceriesResponse)
      })
    })
  });

  it('should be called with correct params', () => {
    const expected = [
      '/api/v1/groceries',
      {
        method: 'POST',
        body: JSON.stringify({ grocery: mockGrocery }),
        headers: { 'Content-Type': 'application/json' }
      }
    ];

    addGrocery(mockGrocery);

    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });

  it('should return a parsed response if status is ok', async () => {
    const result = await addGrocery(mockGrocery);

    expect(result).toEqual(mockGroceriesResponse);
  });

  it('should return an error if status is not ok', async () => {
    window.fetch = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve({
        ok: false
      })
    });

    await expect(addGrocery()).rejects.toEqual(Error('Error adding grocery'));
  });
})