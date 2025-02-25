import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from 'src/database/entities/category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepo.create(createCategoryDto).save()

    return category
  }

  async findAll() {
    const categories = await this.categoryRepo.find({
      order: {
        id: 'asc',
      },
    })

    return categories
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOneBy({
      id,
    })

    if (!category) {
      throw new NotFoundException('qotaq')
    }

    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id)
    const updatedCategory = await this.categoryRepo.update(
      {
        id,
      },
      updateCategoryDto,
    )

    return updatedCategory
  }

  async remove(id: number) {
    await this.findOne(id)

    const deletedCategory = await this.categoryRepo.delete({
      id,
    })

    return deletedCategory
  }
}
