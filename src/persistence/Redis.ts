import { RedisClient, createClient } from 'redis';
import Persistor from './Persistor';

export default class Redis<T> extends Persistor<T> {
  readonly _db: string;

  readonly _prefix?: string;

  private _client: RedisClient;

  private _connected: boolean = false;

  constructor(db: string | number | undefined, prefix?: string) {
    super();
    if (!db) {
      db = 0;
    }
    this._db = db.toString();
    this._prefix = prefix;
    this.type = 'redis';
    this._client = createClient(<string>process.env.REDIS_URI);
  }

  private buildKeyWithPrefix(key?: string) {
    return [this._prefix, key].filter((v) => v).join(':');
  }

  public async set(key: string, data: T): Promise<void> {
    if (!this._connected) {
      await this.connect();
    }
    return new Promise((resolve, reject) => {
      this._client.set(
        this.buildKeyWithPrefix(key),
        JSON.stringify(data),
        (err) => {
          if (err) return reject(err);
          return resolve();
        },
      );
    });
  }

  public async get(key?: string): Promise<T | undefined> {
    if (!this._connected) {
      await this.connect();
    }
    return new Promise((resolve, reject) => {
      this._client.get(this.buildKeyWithPrefix(key), (err, reply) => {
        if (err) return reject();

        const object = reply ? <T>JSON.parse(reply) : undefined;

        return resolve(object);
      });
    });
  }

  public async delete(key: string): Promise<void> {
    if (!this._connected) {
      await this.connect();
    }
    return new Promise((resolve, reject) => {
      this._client.del(this.buildKeyWithPrefix(key), (err) => {
        if (err) return reject();

        return resolve();
      });
    });
  }

  public async has(key: string): Promise<boolean> {
    return this.get(key).then((r) => !!r);
  }

  public async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._client.select(this._db, (err) => {
        if (err) return reject(err);
        this._connected = true;
        return resolve();
      });
    });
  }
}
