import { addGrocery } from './apiCalls';

describe('addGrocery', () => {
  let mockGrocery;
  let mockGroceries;

  beforeEach(() => {
    mockGroceries = [
      { id: 1, name: 'turkey', quantity: 1 },
      { id: 2, name: 'oranges', quantity: 3 },
    ];
    mockGrocery = { name: 'oranges', quantity: 3 };

    window.fetch = jest.fn().mockImplementation(() => (
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(
          mockGroceries
        )
      }) 
    ));
  });

  it('calls fetch with the correct data when adding a new grocery', () => {
    const expectedFetchBody = {
      method: 'POST',
      body: JSON.stringify({grocery: mockGrocery}),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    addGrocery(mockGrocery);
    expect(window.fetch).toHaveBeenCalledWith('/api/v1/groceries', expectedFetchBody);
  });

  it('returns an array of groceries when the status is ok', async () => {
    expect(addGrocery(mockGrocery)).resolves.toBe(mockGroceries);
  });

  it('throws an error if the status is not ok', () => {
    window.fetch = jest.fn().mockImplementationOnce(() => (
      Promise.resolve({ ok: false })
    ));
    expect(addGrocery(mockGrocery)).rejects.toEqual(Error('Response not ok'));
  });
});
