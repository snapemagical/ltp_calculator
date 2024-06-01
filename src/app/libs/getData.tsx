export default async function getData() {
    const response = await fetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY');
    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch response')
      }
     
      return response.json();
}