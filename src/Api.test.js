import React from 'react';
import { addGrocery } from './Api';


describe('Api', () => {
  describe('addGrocery', () => {
    let mockGrocery;
    let mockGroceries;

    beforeEach(() => {
      mockGrocery = { name: 'Pizzas', quantity: '10' };
      mockGroceries = [
        { name: 'burritos', quantity: '20' },
        { name: 'carrots', quantity: '15' },
      ];
      fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockGroceries),
      }));
    });

    it('calls fetch with the correct url and options', () => {
      // setup
      const expectedUrl = '/api/v1/groceries';
      const expectedOptions = {
        method: 'POST',
        body: JSON.stringify({ grocery: mockGrocery }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      // execution
      addGrocery(mockGrocery);

      // expectation
      expect(fetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);
    });

    it('returns an array of groceries', async () => {
      // execution
      const returnedGroceries = await addGrocery(mockGrocery);

      // expectation 
      expect(returnedGroceries).toEqual(mockGroceries);
    });

    it('throws an error if the response is not ok', async () => {
      fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: false,
        status: 404,
      }));
      try {
        await addGrocery(mockGrocery);
      } catch (error) {
        expect(error.message).toBe('Status 404 returned from server.');
      }
    });
  });
});
