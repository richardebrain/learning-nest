import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateItemDto } from './create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './schemas/item.schema';
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }
  @Post()
  createItem(@Body() creatItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(creatItemDto);
  }
  @Delete(':id')
  deleteItem(@Param('id') id: string): Promise<Item> {
    return this.itemsService.delete(id);
  }
  @Put(':id')
  updateItem(
    @Body() updateItemDto: CreateItemDto,
    @Param('id') id: string,
  ): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }
}
