export async function GET() {
    let data = await fetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY', {
        method: "GET"
    });
    const nseData = await data.json();

    return Response.json(nseData);
}