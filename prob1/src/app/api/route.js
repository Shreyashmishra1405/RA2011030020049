async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return []
    }
    const data = await response.json();
    
    return data.numbers;
  } catch (error) {

    return [];
  }
}

export async function GET(Request, p) {
  let url=((new URL(Request.url)).searchParams.getAll("url"));
  try {
    const promises = url.map(url => fetchData(url));
    const results = await Promise.all(promises);

    const arr = [];

    results.forEach((el) => {
      arr.push(...el);
    });

    const uniqueSortedNumbers = Array.from(new Set(arr)).sort((a, b) => a - b);
    return new Response([...uniqueSortedNumbers]);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
  
}
