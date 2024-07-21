import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductDto } from './dto';
import { Product } from './pdoruct.model';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService, private readonly httpService: HttpService) { }

    // @Post()
    // async create(@Body() createProductDto: ProductDto): Promise<Product> {
    //     return this.productService.create(createProductDto);
    // }

    @Get()
    async all() {
        return this.productService.all();
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = await this.productService.findOne(id);
  
        this.httpService.post(`http://localhost:8000/api/products/${id}/like`, {}).subscribe(
            res => {console.log(res);}
        )
        return this.productService.update(id, {
            likes: product.likes + 1
        });
    }

    @EventPattern('product_created')
    async create(data: any) {
        console.log("Hi calling from create");
        
        this.productService.create({
            id: data.id,
            title: data.title,
            image: data.image,
            likes: data.likes
        });
    }

    @EventPattern('product_updated')
    async productUpdated(data: any) {
        this.productService.update(data.id, {
            id: data.id,
            title: data.title,
            image: data.image,
            likes: data.likes
        });
    }

    @EventPattern('product_deleted')
    async productDeleted(data: any) {
        console.log(data, "From controller");
        this.productService.deleteProd(data);
    }
}
