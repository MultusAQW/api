import { getIDbyName } from "@/lib/helpers";
import { inv } from "@/lib/types";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name)
    return NextResponse.json({ error: "No name provided" }, { status: 400 });
  const id = await getIDbyName(name);
  const res = await fetch(
    `https://account.aq.com/Charpage/Inventory?ccid=${id}`,
    {
      cache: "no-cache",
    }
  );
  const data = (await res.json()) as inv[];

  const items = data.map((item) => {
    return {
      acTagged: item.bCoins,
      quantity: item.intCount === 302500 ? 1 : item.intCount,
      name: item.strName,
      type: item.strType,
    };
  });

  return NextResponse.json(items);
}
