import bots from '#/fixtures/regexes/bots.json';
import type { BotResult } from '#/parsers/bot/typing';
import { userAgentParser } from '#/utils/user-agent';

export type DeviceDetectorBotResult = BotResult | null;
export class BotParser {
  public parse = (userAgent: string): DeviceDetectorBotResult => {
    for (const bot of bots) {
      const match = userAgentParser(bot.regex, userAgent);

      if (!match) continue;

      return {
        name: bot.name,
        category: bot.category || '',
        url: bot.url || '',
        producer: {
          name: bot?.producer?.name || '',
          url: bot?.producer?.url || '',
        },
      };
    }

    return null;
  };
}
