import { ItemModel } from '../interfaces/ItemModel';
import { ItemService } from './ItemService';

export class UrlShortenerService {
  public static async getLongUrl(hash: any): Promise<string | undefined> {
    const existent = await ItemService.getByHash(hash);
    if (!existent) {
      return;
    }
    return existent.long_url;
  }

  static async saveOrGet(longUrl: string): Promise<ItemModel | undefined> {
    const existent = await ItemService.getByLongUrl(longUrl);
    if (existent) {
      return existent;
    }

    const hash = await ItemService.generateAvailableHash();
    const shortenUrl = await this.generateShortenUrl(hash);

    const item: ItemModel = {
      long_url: longUrl,
      short_url: shortenUrl,
      hash,
      createdAt: new Date().getTime(),
    };

    await ItemService.save(item);
    return item;
  }

  static async generateShortenUrl(hash: string): Promise<string> {
    return `${process.env.DOMAIN_PROTOCOL}://${process.env.DOMAIN_NAME}/${hash}`;
  }
}
