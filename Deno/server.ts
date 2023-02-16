import { serve } from "https://deno.land/std@0.52.0/http/server.ts";

const server = serve({ port: 8080 });

console.log("Servidor iniciado en http://localhost:8000/");

for await (const req of server) {
  req.respond({ body: "¡Hola, mundo!\n" });
}
