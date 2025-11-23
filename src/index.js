export default {
  async fetch(request) {
    const url = new URL(request.url);

    console.log("PATH:", url.pathname);

    if (url.pathname === "/api/compute") {
      const input = await request.json();
      const result = compute(input);
      return Response.json(result);
    }

    if (url.pathname === "/api/tenants") {
      return Response.json(tenants());
    }

    if (url.pathname === "/api/metrics") {
      return Response.json(metrics());
    }

    return new Response("Worker ACTIVE — no route matched", { status: 200 });
  }
};
