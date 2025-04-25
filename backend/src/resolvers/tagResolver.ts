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
import { Tag } from "../entities/tag";

@InputType()
class TagInput {
    @Field()
    nom: string; // TODO make it required with "!" ?
}

@Resolver(Tag)
export default class TagResolver {
    @Query(() => [Tag])
    async getAllTags() {
        const findOptions: FindManyOptions<Tag> = {
            relations: { ad: true },
        };
        const allTags = await Tag.find(findOptions);
        return allTags;
    }

    @Mutation(() => ID)
    async createTag(@Arg("data") data: TagInput) {
        const tag = Tag.create({ ...data });
        await tag.save();
        return tag.id;
    }
}