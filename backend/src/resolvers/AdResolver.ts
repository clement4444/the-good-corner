import { Query, Resolver, Arg } from "type-graphql";
import { Ad } from "@/entities/ad";
import { FindManyOptions } from "typeorm";

@Resolver(Ad)
export class AdResolver {
    @Query(() => [Ad])
    async getAllAds() {
        const findOptions: FindManyOptions<Ad> = {
            relations: { categories: true, tags: true },
        };

        const allAds = await Ad.find(findOptions);
        return allAds;
    }

    @Query(() => Ad)
    async getAdById(@Arg("id") id: number) {
        const findOptions: FindManyOptions<Ad> = {
            relations: { categories: true, tags: true },
            where: { id }
        };
        const ad = await Ad.findOne(findOptions);
        return ad;
    }
}