import { load } from "cheerio";

export async function getIDbyName(name: string) {
  const response = await fetch(`https://account.aq.com/CharPage?id=${name}`, {
    next: { revalidate: 60 },
  });
  const htmlString = await response.text();
  const htmlS = htmlString.replace(/(\r\n|\n|\r)/gm, "");
  var regex = /var\s+ccid\s*=\s*(\d+);/;
  const match = regex.exec(htmlS);
  if (!match) return "Something went wrong";
  return match[1];
}

export async function getEquippedByName(name: string) {
  const response = await fetch(`https://account.aq.com/CharPage?id=${name}`, {
    next: { revalidate: 60 },
  });
  const htmlString = await response.text();
  const $ = load(htmlString);
  const list = $("div.card-body label").parent().text().trim().split("\n");
  if (list.length == 1) return 404;
  // console.log(list.length)
  const values: Record<string, string> = {};
  list.forEach((l) => {
    const label = l.split(":")[0].trim();
    const value = l.split(":")[1]?.trim();
    if (label) values[label] = value;
  });
  return values;
}
