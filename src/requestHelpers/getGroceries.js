const getGroceries = url => {
  return fetch(url)
    .then(response => {
      if (response.status >= 400) {
        this.setState({
          errorStatus: 'Error fetching groceries'
        });
      }
      else {
        return response.json().then(data => data.groceries)
      }
    })
}

export default getGroceries;
