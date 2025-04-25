import {
    Arg,
    Field,
    ID,
    InputType,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { FindManyOptions } from "typeorm";
import { Category } from "../entities/category";

@InputType()
class CategoryInput {
    @Field()
    nom: string;
}

@Resolver(Category)
export default class CategoryResolver {
    @Query(() => [Category])
    async getAllCategories() {
        const findOptions: FindManyOptions<Category> = {
            relations: { ad: true },
        };
        const allCategories = await Category.find(findOptions);

        return allCategories;
    }

    @Mutation(() => ID)
    async createCategory(@Arg("data") data: CategoryInput) {
        const category = Category.create({ ...data });
        await category.save();
        return category.id;
    }
}