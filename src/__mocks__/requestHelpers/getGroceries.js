const mockGroceries = [
  { id: 1, name: 'Pineapples', quantity: 12 },
  { id: 2, name: 'Coconuts', quantity: 1000 },
  { id: 3, name: 'Pears', quantity: 5 }
];

const getGroceries = url => {
  console.log('sup!')
  return new Promise(res => res(mockGroceries))
}

export default getGroceries
