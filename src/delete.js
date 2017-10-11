const DELAY_MS = 2000

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchResponseJson = async (url) => {
  try {
    const response = await fetch(url)
    const responseJson = await response.json()
    // You can introduce here an artificial delay, both Promises and async/await will wait until the function returns
    // await sleep(DELAY_MS)
    return responseJson
  }
  catch (e) {
    console.log(`fetchResponseJson failed:`, e)
  }
}
