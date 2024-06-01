export async function getData() {
  const data = await fetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY', {cache: 'no-cache'});
  if (!data.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return data.json()
 
}