export async function GET() {
    let data = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: "GET"
    });
    const nseData = await data.json();

    return Response.json(nseData);
}