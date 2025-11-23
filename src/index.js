export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Helper: safe JSON parsing for GET requests
    async function safeJson(req) {
      try {
        if (req.headers.get("content-length") === "0") return {};
        return await req.json();
      } catch {
        return {};
      }
    }

    // ---- /api/compute ----
    if (path.startsWith('/api/compute')) {
      const input = await safeJson(request);   // <-- FIXED
      const result = compute(input);
      return new Response(JSON.stringify(result), { status: 200 });
    }

    // ---- /api/tenants ----
    if (path.startsWith('/api/tenants')) {
      const result = tenants();
      return new Response(JSON.stringify(result), { status: 200 });
    }

    // ---- /api/metrics ----
    if (path.startsWith('/api/metrics')) {
      const result = metrics();
      return new Response(JSON.stringify(result), { status: 200 });
    }

    return new Response("K9 Engine Online", { status: 200 });
  }
};
