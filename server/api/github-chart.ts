export default defineEventHandler(async (event) => {
  try {
    const username = 'ardianilyas';
    const [svgRes, htmlRes] = await Promise.all([
      fetch(`https://ghchart.rshah.org/${username}`),
      fetch(`https://github.com/users/${username}/contributions`)
    ]);
    
    if (!svgRes.ok || !htmlRes.ok) {
      throw new Error(`Failed to fetch`);
    }
    
    const svg = await svgRes.text();
    const html = await htmlRes.text();
    
    // Scrape total contributions (e.g. "537 contributions in the last year")
    const match = html.match(/([\d,]+)\s+contributions/i);
    const total = match ? match[1] : '0';
    
    setResponseHeader(event, 'Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    return {
      svg,
      total
    };
  } catch (error) {
    console.error('GitHub Fetch Error:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch GitHub data'
    });
  }
});
