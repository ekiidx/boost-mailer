import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        temperature: 0.7,
        top_p: 0.95,
        stream: false
      })
    });

    const text = await llamafileRes.text();
    const cleanedResponse = text.trim();

    // Save to Postgres
    await prisma.prompt.create({
      data: {
        prompt,
        response: cleanedResponse
      }
    });

    console.log('Llamafile replied with:', text);


    return new Response(JSON.stringify({ content: cleanedResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Llamafile or DB error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// export async function GET() {
//   try {
//     const logs = await prisma.promptLog.findMany({
//       orderBy: { createdAt: 'desc' },
//       take: 20,
//     });

//     return new Response(JSON.stringify({ logs }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: 'Failed to fetch logs' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }

