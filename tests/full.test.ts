import { describe, test, expect } from 'bun:test';
import camera from '#/fixtures/Tests/fixtures/camera.json';
import car_browser from '#/fixtures/Tests/fixtures/car_browser.json';
import console from '#/fixtures/Tests/fixtures/console.json';
import desktop from '#/fixtures/Tests/fixtures/desktop.json';
import feature_phone from '#/fixtures/Tests/fixtures/feature_phone.json';
import feed_reader from '#/fixtures/Tests/fixtures/feed_reader.json';
import mediaplayer from '#/fixtures/Tests/fixtures/mediaplayer.json';
import mobile_apps from '#/fixtures/Tests/fixtures/mobile_apps.json';
import phablet from '#/fixtures/Tests/fixtures/phablet.json';
import portable_media_player from '#/fixtures/Tests/fixtures/portable_media_player.json';
import smart_display from '#/fixtures/Tests/fixtures/smart_display.json';
import smart_speaker from '#/fixtures/Tests/fixtures/smart_speaker.json';
import smartphone_1 from '#/fixtures/Tests/fixtures/smartphone-1.json';
import smartphone_2 from '#/fixtures/Tests/fixtures/smartphone-2.json';
import smartphone_3 from '#/fixtures/Tests/fixtures/smartphone-3.json';
import smartphone_4 from '#/fixtures/Tests/fixtures/smartphone-4.json';
import smartphone_5 from '#/fixtures/Tests/fixtures/smartphone-5.json';
import smartphone_6 from '#/fixtures/Tests/fixtures/smartphone-6.json';
import smartphone_7 from '#/fixtures/Tests/fixtures/smartphone-7.json';
import smartphone_8 from '#/fixtures/Tests/fixtures/smartphone-8.json';
import smartphone_9 from '#/fixtures/Tests/fixtures/smartphone-9.json';
import smartphone_10 from '#/fixtures/Tests/fixtures/smartphone-10.json';
import smartphone_11 from '#/fixtures/Tests/fixtures/smartphone-11.json';
import smartphone_12 from '#/fixtures/Tests/fixtures/smartphone-12.json';
import smartphone_13 from '#/fixtures/Tests/fixtures/smartphone-13.json';
import smartphone_14 from '#/fixtures/Tests/fixtures/smartphone-14.json';
import smartphone_15 from '#/fixtures/Tests/fixtures/smartphone-15.json';
import smartphone_16 from '#/fixtures/Tests/fixtures/smartphone-16.json';
import smartphone_17 from '#/fixtures/Tests/fixtures/smartphone-17.json';
import smartphone_18 from '#/fixtures/Tests/fixtures/smartphone-18.json';
import smartphone_19 from '#/fixtures/Tests/fixtures/smartphone-19.json';
import smartphone_20 from '#/fixtures/Tests/fixtures/smartphone-20.json';
import smartphone_21 from '#/fixtures/Tests/fixtures/smartphone-21.json';
import smartphone_22 from '#/fixtures/Tests/fixtures/smartphone-22.json';
import smartphone from '#/fixtures/Tests/fixtures/smartphone.json';
import tablet_1 from '#/fixtures/Tests/fixtures/tablet-1.json';
import tablet_2 from '#/fixtures/Tests/fixtures/tablet-2.json';
import tablet_3 from '#/fixtures/Tests/fixtures/tablet-3.json';
import tablet_4 from '#/fixtures/Tests/fixtures/tablet-4.json';
import tablet_5 from '#/fixtures/Tests/fixtures/tablet-5.json';
import tablet from '#/fixtures/Tests/fixtures/tablet.json';
import tv_1 from '#/fixtures/Tests/fixtures/tv-1.json';
import tv from '#/fixtures/Tests/fixtures/tv.json';
import unknown from '#/fixtures/Tests/fixtures/unknown.json';
import wearable from '#/fixtures/Tests/fixtures/wearable.json';
import DeviceDetector from '#/index.js';
import type { BrowserResult } from '#/parsers/client/browser.js';
import { formatVersion } from '#/utils/version.js';

const tests: any = [
  camera,
  car_browser,
  console,
  desktop,
  feature_phone,
  feed_reader,
  mediaplayer,
  mobile_apps,
  phablet,
  portable_media_player,
  smart_display,
  smart_speaker,
  smartphone,
  smartphone_1,
  smartphone_2,
  smartphone_3,
  smartphone_4,
  smartphone_5,
  smartphone_6,
  smartphone_7,
  smartphone_8,
  smartphone_9,
  smartphone_10,
  smartphone_11,
  smartphone_12,
  smartphone_13,
  smartphone_14,
  smartphone_15,
  smartphone_16,
  smartphone_17,
  smartphone_18,
  smartphone_19,
  smartphone_20,
  smartphone_21,
  smartphone_22,
  tablet,
  tablet_1,
  tablet_2,
  tablet_3,
  tablet_4,
  tablet_5,
  tv,
  tv_1,
  unknown,
  wearable,
];

const versionTruncation = 1;

const deviceDetector = new DeviceDetector({
  versionTruncation,
});

describe('Full test', () => {
  for (const unitTest of tests) {
    const brand = unitTest.device.brand || '';

    test(`${unitTest.os.name || ''} ${brand} ${unitTest.client.name || ''}`, () => {
      const result = deviceDetector.parse(unitTest.user_agent);

      const expectedClientType = (unitTest.client.type || '').replace('pim', 'personal information manager').replace('mediaplayer', 'media player');

      const expectedDeviceType = (unitTest.device.type || '').replace('car browser', 'car').replace('tv', 'television');

      // Some tests contains "null" as string for the model
      // We need to sanitize it
      if (unitTest.device.model === 'null') {
        unitTest.device.model = '';
      }

      expect({
        // userAgent: unitTest.user_agent,
        os: {
          name: result?.os?.name || '',
          version: result?.os?.version || '',
          platform: result?.os?.platform || '',
        },
        client: {
          type: result?.client?.type || '',
          name: result?.client?.name || '',
          version: result?.client?.version || '',
          engine: result?.client?.type === 'browser' ? (result?.client as BrowserResult).engine : '',
          engineVersion: result?.client?.type === 'browser' ? (result?.client as BrowserResult).engineVersion : '',
        },
        device: {
          type: result?.device?.type || '',
          brand: result?.device?.brand || '',
          model: result?.device?.model || '',
        },
      }).toEqual({
        // userAgent: unitTest.user_agent,
        os: {
          name: unitTest.os.name || '',
          version: formatVersion(unitTest.os.version, versionTruncation) || '',
          platform: unitTest.os.platform || '',
        },
        client: {
          type: expectedClientType,
          name: unitTest.client.name || '',
          version: formatVersion(unitTest.client.version, versionTruncation) || '',
          engine: unitTest.client.engine || '',
          engineVersion: formatVersion(unitTest.client.engine_version, versionTruncation) || '',
        },
        device: {
          type: expectedDeviceType,
          brand,
          model: unitTest.device.model || '',
        },
      });
    });
  }
});
