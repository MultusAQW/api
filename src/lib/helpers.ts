import { load } from "cheerio";

export class AQW {
  protected baseURL = "https://account.aq.com/CharPage";
  protected init: RequestInit = {
    cache: "no-cache",
  };

  getIDbyName = async (name: string) => {
    const url = new URL(this.baseURL);
    url.searchParams.append("id", name);
    try {
      const response = await fetch(url, this.init);
      const htmlString = await response.text();
      const htmlS = htmlString.replace(/(\r\n|\n|\r)/gm, "");
      var regex = /var\s+ccid\s*=\s*(\d+);/;
      const match = regex.exec(htmlS);
      if (!match) throw new Error("Error");
      return Number(match[1]);
    } catch (error) {
      return null;
    }
  };

  getEquippedByName = async (name: string) => {
    const url = new URL(this.baseURL);
    url.searchParams.append("id", name);
    const response = await fetch(url, this.init);
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
    console.log({ values });
    return values;
  };
}
