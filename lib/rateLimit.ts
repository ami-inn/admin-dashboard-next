import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit"; 

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5,'1m'),
  analytics: true,
  prefix: "@upstash/ratelimit",
});



// upstash ratellimit github for the normal api path

// export default async function middleware(
//     request: NextRequest,
//     context: NextFetchEvent,
//   ): Promise<Response | undefined> {
//     const ip = request.ip ?? "127.0.0.1";
  
//     const { success, pending, limit, remaining } = await ratelimit.limit(ip);
//     // we use context.waitUntil since analytics: true.
//     // see https://upstash.com/docs/oss/sdks/ts/ratelimit/gettingstarted#serverless-environments
//     context.waitUntil(pending);
  
//     const res = success
//       ? NextResponse.next()
//       : NextResponse.redirect(new URL("/api/blocked", request.url));
  
//       res.headers.set("X-RateLimit-Success", success.toString());
//       res.headers.set("X-RateLimit-Limit", limit.toString());
//       res.headers.set("X-RateLimit-Remaining", remaining.toString());
  
//     return res;
//   }
  
//   export const config = {
//     matcher: "/api",
//   };


export default ratelimit;
