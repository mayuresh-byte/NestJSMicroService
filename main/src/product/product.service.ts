import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './pdoruct.model';
import { Model } from 'mongoose';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) { }

    async create(data: any) {
        console.log("Hi calling from create service");
        return new this.productModel(data).save();
    }

    async all() {
        return this.productModel.find().exec();
    }

    async findOne(id: number) {
        return this.productModel.findOne({ id });
    }

    async update(id: number, data) {
        return this.productModel.findOneAndUpdate({ id }, data);
    }

    async deleteProd(id: any) {
        console.log("Deleting trying", id); // Ensure the correct id is logged
        const result = await this.productModel.deleteOne({ id });
        console.log('Delete result:', result); // Log the result to ensure deletion
        return result;
    }

}
