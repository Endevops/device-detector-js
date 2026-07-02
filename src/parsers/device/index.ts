import type { GenericDeviceResult } from '#/typings/device';
import { CameraParser } from './cameras';
import { CarParser } from './cars';
import { ConsoleParser } from './consoles';
import { MobileParser } from './mobiles';
import { NotebooksParser } from './notebooks';
import { PortableMediaPlayersParser } from './portable-media-players';
import { TelevisionParser } from './televisions';

const deviceParsers = [ConsoleParser, CarParser, CameraParser, TelevisionParser, PortableMediaPlayersParser, MobileParser, NotebooksParser];

export type DeviceResult = GenericDeviceResult | null;

export class DeviceParser {
  public parse = (userAgent: string): DeviceResult => {
    for (const Parser of deviceParsers) {
      const parser = new Parser();
      const device = parser.parse(userAgent);

      if (device.type !== '') {
        return device;
      }
    }

    return null;
  };
}
