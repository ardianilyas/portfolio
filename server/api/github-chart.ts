export default defineEventHandler(async (event) => {
  try {
    const username = 'ardianilyas';
    const [svgRes, htmlRes] = await Promise.all([
      fetch(`https://ghchart.rshah.org/${username}`).catch(() => null),
      fetch(`https://github.com/users/${username}/contributions`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        }
      }).catch(() => null)
    ]);
    
    let svg = '';
    let total = '0';

    if (svgRes && svgRes.ok) {
      svg = await svgRes.text();
    }
    
    if (htmlRes && htmlRes.ok) {
      const html = await htmlRes.text();
      const match = html.match(/([\d,]+)\s+contributions/i);
      if (match) total = match[1];
    }
    
    setResponseHeader(event, 'Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    return {
      svg,
      total
    };
  } catch (error) {
    console.error('GitHub Fetch Error:', error);
    return {
      svg: '',
      total: '0'
    };
  }
});
