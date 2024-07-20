import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    async all() {
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
