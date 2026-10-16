export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  return Response.json(
    {
      ok: true,
      revision: process.env.DEPLOY_REVISION?.trim() || 'unknown',
      service: 'soul-portal',
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
