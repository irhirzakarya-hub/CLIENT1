import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('logo') as File;
    if (!file) return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create public/logo directory if it doesn't exist
    const logoDir = path.join(process.cwd(), 'public', 'logo');
    if (!fs.existsSync(logoDir)) {
      fs.mkdirSync(logoDir, { recursive: true });
    }

    // Clean directory first to remove old logo
    const files = fs.readdirSync(logoDir);
    for (const f of files) {
      if (f !== '.gitkeep') {
         fs.unlinkSync(path.join(logoDir, f));
      }
    }

    // Save new file
    const ext = file.name.split('.').pop() || 'png';
    const filename = `logo-${Date.now()}.${ext}`;
    const filepath = path.join(logoDir, filename);

    fs.writeFileSync(filepath, buffer);

    return NextResponse.json({ success: true, url: `/logo/${filename}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to upload' }, { status: 500 });
  }
}
