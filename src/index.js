export default {
  async fetch(request) {

    // --- CORS preflight ---
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    // --- GET check ---
    if (request.method === "GET") {
      return new Response(JSON.stringify({
        ok: true,
        received: null,
        message: "Worker alive and responding."
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // --- POST compute execution ---
    try {
      const body = await request.json().catch(() => null);

      return new Response(JSON.stringify({
        ok: true,
        received: body,
        message: "K9 compute processed successfully."
      }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({
        ok: false,
        error: err.toString()
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
