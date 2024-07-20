import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService, @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) {}

    @Get()
    async all() {
        this.client.emit('Hello', 'Hello From RabbitMQ !!');
        return this.productService.all();
    }

    @Post()
    async create(@Body() productDto: ProductDto) {
        return this.productService.create(productDto);
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        return this.productService.getUser(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: Partial<ProductDto>) {
        return this.productService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id);
    }
}
