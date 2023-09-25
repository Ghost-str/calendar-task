import uniqArray from "./bonus1";
import {
  INPUT,
  UNIQ_BY_CITY,
  UNIQ_BY_USER_NAME,
} from "./tests/fixtures/bonus1.fixture";

describe("uniqArray", () => {
  const CITY_KEY = "address.city";
  it(`should return array with unique items by key ${CITY_KEY}`, () => {
    expect(uniqArray(INPUT, CITY_KEY)).toEqual(UNIQ_BY_CITY);
  });

  const USER_NAME_KEY = "user.name.first";
  it(`should return array with unique items by key ${USER_NAME_KEY}`, () => {
    expect(uniqArray(INPUT, USER_NAME_KEY)).toEqual(UNIQ_BY_USER_NAME);
  });
});
