export async function POST(req) {
  const body = await req.json();
  const { prompt } = body;

  if (!prompt) {
    return new Response(JSON.stringify({ message: 'Prompt is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const llamafileRes = await fetch('http://localhost:8080/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        temperature: 0.7,
        top_p: 0.95,
        stream: false
      })
    });

    const text = await llamafileRes.text();

    console.log('Llamafile replied with:', text);

    return new Response(JSON.stringify({ content: text.trim() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Llamafile fetch failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
