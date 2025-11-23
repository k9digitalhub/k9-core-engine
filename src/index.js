import keys from '../keys.js';
import metrics from '../metrics.js';
import partners from '../partners.js';
import tenants from '../tenants.js';
import compute from '../compute.js';

// Cloudflare Worker entry
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // /api/compute
    if (url.pathname.startsWith('/api/compute')) {
      const input = await request.json();
      const result = compute(input);
      return new Response(JSON.stringify(result), { status: 200 });
    }

    // /api/tenants
    if (url.pathname.startsWith('/api/tenants')) {
      const result = tenants();
      return new Response(JSON.stringify(result), { status: 200 });
    }

    // /api/metrics
    if (url.pathname.startsWith('/api/metrics')) {
      const result = metrics();
      return new Response(JSON.stringify(result), { status: 200 });
    }

    return new Response("K9 Engine Online", { status: 200 });
  }
};
