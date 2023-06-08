import { getEquippedByName, getIDbyName } from "@/lib/helpers";
import { NextResponse } from "next/server";

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name)
    return NextResponse.json({ error: "No name provided" }, { status: 400 });
  const data = await getEquippedByName(name);
  if (data === 404)
    return NextResponse.json({ error: "No data found" }, { status: data });

  return NextResponse.json({ data });
}
