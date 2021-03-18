import {serve} from "https://deno.land/std@0.90.0/http/server.ts";

const s = serve({port: 8000});

for await (const request of s) {
    request.respond({status: 200, body: 'Hello World'});
}
