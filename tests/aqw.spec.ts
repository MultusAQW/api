import { AQW } from "@/lib/helpers";
import { test, expect } from "@playwright/test";

const aqw = new AQW();

test("Get ID by name", async () => {
  const data = await aqw.getIDbyName("Neiru");
  expect(data).toEqual(expect.any(Number));
});

test("Get Equipped by name", async () => {
  const data = await aqw.getEquippedByName("Neiru");
  expect(data).toEqual(
    expect.objectContaining({
      Armor: expect.any(String),
      Cape: expect.any(String),
      Class: expect.any(String),
      Faction: expect.any(String),
      Guild: expect.any(String),
      Helm: expect.any(String),
      Level: expect.any(String),
      Misc: expect.any(String),
      Pet: expect.any(String),
      Weapon: expect.any(String),
    })
  );
});
