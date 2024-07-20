import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

    async all() {
        return this.productRepository.find();
    }

    async create(productDto: ProductDto) {
        return this.productRepository.save(productDto);
    }

    async getUser(id: number) {
        return this.productRepository.findOneBy({id});
    }

    async update(id: number, dto: Partial<ProductDto>) {
        return this.productRepository.update(id, dto)
    }

    async delete(id: number) {
        return this.productRepository.delete(id);
    }
}
