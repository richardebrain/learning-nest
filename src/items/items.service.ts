import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) {}
  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }
  async findOne(id: string): Promise<Item> {
    return this.itemModel.findOne({ _id: id }).exec() as Promise<Item>;
  }

  async createItem(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }
  async delete(id: string): Promise<Item> {
    const deleted = this.itemModel.findByIdAndRemove(id).exec();
    return deleted as Promise<Item>;
  }
  async update(id: string, item: Item): Promise<Item> {
    return (await this.itemModel
      .findByIdAndUpdate(id, item, {
        new: true,
      })
      .exec()) as unknown as Promise<Item>;
  }
}
