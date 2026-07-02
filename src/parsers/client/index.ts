import type { BrowserResult } from './browser';
import { BrowserParser } from './browser';
import type { FeedReaderResult } from './feed-readers';
import { FeedReaderParser } from './feed-readers';
import type { LibraryResult } from './libraries';
import { LibraryParser } from './libraries';
import type { MediaPlayerResult } from './media-players';
import { MediaPlayerParser } from './media-players';
import type { MobileAppResult } from './mobile-apps';
import { MobileAppParser } from './mobile-apps';
import type { PersonalInformationManagerResult } from './personal-information-managers';
import { PersonalInformationManagerParser } from './personal-information-managers';

interface Options {
  versionTruncation: 0 | 1 | 2 | 3 | null;
}

const clientParsers = [FeedReaderParser, MobileAppParser, MediaPlayerParser, PersonalInformationManagerParser, BrowserParser, LibraryParser];

export type ClientResult =
  | BrowserResult
  | FeedReaderResult
  | LibraryResult
  | MediaPlayerResult
  | MobileAppResult
  | PersonalInformationManagerResult
  | null;

export class ClientParser {
  private readonly options: Options = {
    versionTruncation: 1,
  };

  constructor(options?: Partial<Options>) {
    this.options = { ...this.options, ...options };
  }

  public parse = (userAgent: string): ClientResult => {
    for (const Parser of clientParsers) {
      const parser = new Parser(this.options);
      const client = parser.parse(userAgent);

      if (client.type !== '') return client;
    }

    return null;
  };
}
