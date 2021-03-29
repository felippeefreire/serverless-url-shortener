import Redis from '../persistence/Redis';
import {ItemModel} from "../interfaces/ItemModel";

const ItemRepository = new Redis<ItemModel>(
  process.env.REDIS_DB,
);

export default ItemRepository;
