import { describe, test, expect } from 'bun:test';
import vendorFragmentTests from '#/fixtures/Tests/Parser/fixtures/vendorfragments.json';
import { VendorFragmentParser } from '#/parsers/vendor-fragment';

const vendorFragmentParser = new VendorFragmentParser();

describe('Vendor fragments', () => {
  for (const vendorFragmentTest of vendorFragmentTests) {
    const brand = vendorFragmentTest.vendor;

    test(`${brand}`, () => {
      const result = vendorFragmentParser.parse(vendorFragmentTest.useragent);

      expect(result).toEqual(brand);
    });
  }
});
