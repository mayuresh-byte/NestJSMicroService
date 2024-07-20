import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductDto } from './dto';
import { Product } from './pdoruct.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post()
    async create(@Body() createProductDto: ProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    @Get()
    async all() {
        return this.productService.all();
    }
}
