// ===== IMPORTS =====
import keys from './keys.js';
import metrics from './metrics.js';
import partners from './partners.js';
import tenants from './tenants.js';
import compute from './compute.js';

// ===== WORKER ENTRY =====
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Extract safe JSON body (avoids 1101 crash)
    let body = {};
    if (request.method !== 'GET') {
      try {
        body = await request.json();
      } catch (err) {
        body = {}; // no JSON body provided
      }
    }

    // ===== /api/compute =====
    if (url.pathname.startsWith('/api/compute')) {
      const result = compute(body);
      return json(result);
    }

    // ===== /api/tenants =====
    if (url.pathname.startsWith('/api/tenants')) {
      const result = tenants(body);
      return json(result);
    }

    // ===== /api/metrics =====
    if (url.pathname.startsWith('/api/metrics')) {
      const result = metrics(body);
      return json(result);
    }

    // ===== /api/partners =====
    if (url.pathname.startsWith('/api/partners')) {
      const result = partners(body);
      return json(result);
    }

    // ===== /api/keys =====
    if (url.pathname.startsWith('/api/keys')) {
      const result = keys(body);
      return json(result);
    }

    // ===== DEFAULT FALLBACK =====
    return new Response(
      JSON.stringify({
        status: "ok",
        engine: "K9 Core Engine Online",
        message: "Valid endpoints: /api/compute, /api/tenants, /api/metrics, /api/partners, /api/keys"
      }),
      { status: 200, headers: defaultHeaders() }
    );
  }
};

// ===== HELPERS =====
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: defaultHeaders()
  });
}

function defaultHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  };
}
