import { describe, expect, test } from "@jest/globals";
import { Day } from "~/src/types/teams";
import { getClosestDayFromNow } from "../../../src/utils/getClosestDayFromNow";

describe("It should get the date of the closest game day", () => {
  const days: Day[] = [
    { id: 1, date: "2024-01-18 18:00:00.000" },
    { id: 2, date: "2024-01-19 18:00:00.000" },
    { id: 3, date: "2024-01-25 18:00:00.000" },
  ];

  test("return the date of January 18th 2024", () => {
    expect(getClosestDayFromNow(days)).toBe("Thu Jan 18 2024");
  });
  test("return the date of January 18th 2023", () => {
    expect(getClosestDayFromNow(days)).not.toBe("Fri Jan 19 2024");
  });
});

describe("It should return the last date of the array", () => {
  const days: Day[] = [
    { id: 1, date: "2023-01-08 18:00:00.000" },
    { id: 2, date: "2023-01-09 18:00:00.000" },
    { id: 3, date: "2023-01-15 18:00:00.000" },
  ];
  test("return the date of January 15th 2023", () => {
    expect(getClosestDayFromNow(days)).toBe("Sun Jan 15 2023");
  });
  test("return the date of January 15th 2023", () => {
    expect(getClosestDayFromNow(days)).not.toBe("Sun Jan 08 2023");
  });
});
