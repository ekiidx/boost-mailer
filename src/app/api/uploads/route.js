import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file.name !== 'string') {
      return NextResponse.json({ error: 'Invalid file upload' }, { status: 400 });
    }

    // Convert Blob to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads dir if not exists
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    // Save file
    const filePath = path.join(uploadsDir, file.name);
    fs.writeFileSync(filePath, buffer);

    // Path to your Python script
    const scriptPath = path.join(process.cwd(), 'python', 'llamaindex_runner.py');
    const pythonExecutable = path.join(process.cwd(), 'python', 'venv', 'bin', 'python');

    // Spawn Python process with correct file path
    return new Promise((resolve) => {
      const py = spawn(pythonExecutable, [scriptPath, filePath]);

      let output = '';
      let error = '';

      py.stdout.on('data', (data) => {
        output += data.toString();
      });

      py.stderr.on('data', (data) => {
        error += data.toString();
      });

      py.on('close', (code) => {
        if (code === 0) {
          resolve(NextResponse.json({ result: output }));
        } else {
          resolve(NextResponse.json({ error: error.trim() }, { status: 500 }));
        }
      });
    });
  } catch (err) {
    console.error('API /api/uploads error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}