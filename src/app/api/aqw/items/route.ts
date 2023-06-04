import { getIDbyName } from '@/lib/helpers';
import { inv } from '@/lib/types';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    if (!name) return new Response("No name provided", { status: 400 });
    revalidateTag(name);
    const id = await getIDbyName(name)
    const res = await fetch(`https://account.aq.com/Charpage/Inventory?ccid=${id}`)
    const data = await res.json() as inv[]

    const items = data.map(item => {
        return {
            acTagged: item.bCoins,
            quantity: item.intCount === 302500 ? 1 : item.intCount,
            name: item.strName,
            type: item.strType
        }
    })
    
    return NextResponse.json(items);
}