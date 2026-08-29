export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url') || 'shoutlyai.com';

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (type, data) => {
        controller.enqueue(`data: ${JSON.stringify({ type, ...data })}\n\n`);
      };

      sendEvent('status', { message: `Scraping domain metadata for ${targetUrl}...` });

      setTimeout(() => sendEvent('status', { message: 'Analyzing layout tokens...' }), 1000);

      setTimeout(() => {
        sendEvent('post', {
          data: {
            platform: 'LinkedIn',
            badge: 'PRODUCTIVITY',
            headline: `Automate Workflows with ${targetUrl}`,
            subtext: 'AI content production in seconds.',
            post: `🚀 Scaling content creation is now effortless with ${targetUrl}.\n\n#SaaS #AI`,
            theme: { bgGradient: ['#0f172a', '#1e1b4b'], accentColor: '#6366f1' }
          }
        });
      }, 2000);

      setTimeout(() => {
        sendEvent('complete', {});
        controller.close();
      }, 3500);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}