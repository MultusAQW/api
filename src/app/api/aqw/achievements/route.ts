import { getIDbyName } from "@/lib/helpers";
import { badge } from "@/lib/types";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name) return NextResponse.json({ error: "No name provided" }, { status: 400 });
  revalidateTag(name);
  const id = await getIDbyName(name);
  const res = await fetch(`https://account.aq.com/Charpage/Badges?ccid=${id}`);
  const data = (await res.json()) as badge[];

  const badges = data.map((badge) => {
    const { badgeID, sCategory, sTitle, sDesc, sFileName, sSubCategory } =
      badge;
    return {
      id: badgeID,
      category: sCategory,
      title: sTitle,
      description: sDesc,
      imageURL: `https://www.aq.com/images/icons/badges/${sFileName}`,
      subCategory: sSubCategory,
    };
  });

  return NextResponse.json({total: badges.length, badges});
}
