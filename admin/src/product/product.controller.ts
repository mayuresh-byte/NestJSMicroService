import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService, @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) {}

    @Get()
    async all() {
        // this.client.emit('Hello', 'Hello From RabbitMQ !!');
        return this.productService.all();
    }

    @Post()
    async create(@Body() productDto: ProductDto) {
        const product = await this.productService.create(productDto);
        this.client.emit('product_created', product);
        return product;
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        return this.productService.getUser(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: Partial<ProductDto>) {
        await this.productService.update(id, dto);

        const product = await this.productService.getUser(id);
        this.client.emit('product_updated', product);
        return product;
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.productService.delete(id);
        this.client.emit('product_deleted', id);
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = await this.productService.getUser(id);

        return this.productService.update(id, {
            likes: product.likes + 1
        });
    }
}
