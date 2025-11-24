// ---- IMPORT MODULES ----
import keys from './keys.js';
import metrics from './metrics.js';
import partners from './partners.js';
import tenants from './tenants.js';
import compute from './compute.js';

// ---- CORS HEADERS ----
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400"
  };
}

// ---- HANDLE CORS PREFLIGHT ----
function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders()
  });
}

// ---- SAFELY PARSE JSON ----
async function safeJson(request) {
  try {
    const text = await request.text();
    if (!text) return {};
    return JSON.parse(text);
  } catch (e) {
    return {};
  }
}

// ---- MAIN WORKER ----
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // OPTIONS → CORS
    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }

    // ---- /api/compute ----
    if (path.startsWith("/api/compute")) {
      const body = await safeJson(request);
      const result = compute(body);

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders()
        }
      });
    }

    // ---- /api/tenants ----
    if (path.startsWith("/api/tenants")) {
      const result = tenants();

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders()
        }
      });
    }

    // ---- /api/metrics ----
    if (path.startsWith("/api/metrics")) {
      const result = metrics();

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders()
        }
      });
    }

    // ---- DEFAULT ----
    return new Response("K9 Engine Online", {
      status: 200,
      headers: corsHeaders()
    });
  }
};
