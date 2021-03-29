import sha256 from 'crypto-js/sha256';
import { ItemModel } from '../interfaces/ItemModel';
import ItemRepository from '../repositories/ItemRepository';

export class ItemService {
  public static async getByLongUrl(longUrl: string): Promise<ItemModel | undefined> {
    const key = this.generateKeyByLongUrl(longUrl);
    return ItemRepository.get(key).catch((error) => undefined);
  }

  public static async getByHash(hash: string): Promise<ItemModel | undefined> {
    const key = this.generateKeyByHash(hash);
    return ItemRepository.get(key).catch((error) => undefined);
  }

  public static async generateAvailableHash(): Promise<string> {
    let existent = false;
    let hash = '';
    do {
      hash = this.generateHash();
      existent = !!(await this.getByHash(hash));
    } while (existent);
    return hash;
  }

  static async save(item: ItemModel): Promise<void[]> {
    return Promise.all([
      this.generateKeyByLongUrl(item.long_url),
      this.generateKeyByHash(item.hash),
    ].map((key) => ItemRepository.set(key, item)));
  }

  private static generateKeyByLongUrl(longUrl: string): string {
    const hash = sha256(longUrl).toString();
    return `url:${hash}`;
  }

  private static generateKeyByHash(hash: string): string {
    return `hash:${hash}`;
  }

  private static generateHash(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
