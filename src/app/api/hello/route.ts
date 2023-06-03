import { NextResponse } from 'next/server';
 
export async function GET() {
  return NextResponse.json({ hello: 'world' });
}

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") ?? 'world';
    return NextResponse.json({ hello: name });
}