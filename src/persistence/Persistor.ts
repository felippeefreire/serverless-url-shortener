export default abstract class Persistor<T> {
  private _type: string;

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  public abstract set(key: string, data: T): Promise<void>;

  public abstract get(key: string): Promise<T | undefined>;
}
