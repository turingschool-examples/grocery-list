import React from 'react';
import { addGrocery } from './Api';

describe('Api', () => {
  describe('addGrocery', () => {
    let mockGrocery;
    let mockGroceries;

    beforeEach(() => {
      mockGrocery = { name: 'pizza', quantity: 20 };
      mockGroceries = [
        { name: 'pies', quanity: 50 },
        { name: 'burritos', quantity: '100'},
      ]; 

      fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGroceries),
      }));
    });

    it('calls fetch with the correct url and options', () => {
      // setup
      const expectedOptions = {
        method: 'POST',
        body: JSON.stringify({ grocery: mockGrocery }),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      // execution
      addGrocery(mockGrocery);

      // expectation
      expect(fetch).toHaveBeenCalledWith('/api/v1/groceries', expectedOptions);
    });

    it('returns an array of groceries if the response is ok', async () => {
      const groceries = await addGrocery(mockGrocery);
      expect(groceries).toEqual(mockGroceries);
    });

    it('throws an error if the response is not ok', async () => {
      fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: false,
      }));

      try {
        await addGrocery(mockGrocery);
      } catch (error) {
        expect(error.message).toBe('Response was not ok.');
      }
    });
  });
});
