import { Query, Resolver, Arg, Mutation, ID } from "type-graphql";
import { Ad, AdInput } from "../entities/ad";
import { FindManyOptions } from "typeorm";

@Resolver(Ad)
export class AdResolver {
    //récupére tout les ad
    @Query(() => [Ad])
    async getAllAds() {
        const findOptions: FindManyOptions<Ad> = {
            relations: { categories: true, tags: true },
        };

        const allAds = await Ad.find(findOptions);
        return allAds;
    }

    //récupére un seul ad
    @Query(() => Ad)
    async getAdById(@Arg("id") id: number) {
        const findOptions: FindManyOptions<Ad> = {
            relations: { categories: true, tags: true },
            where: { id }
        };
        const ad = await Ad.findOne(findOptions);
        return ad;
    }

    //crée un nouvel ad
    @Mutation(() => ID)
    async createAd(@Arg("data") data: AdInput) {
        const newAd = Ad.create({
            ...data,
            tags: data.tags.map((tag) => ({ id: Number(tag) })),
        });
        await newAd.save();

        return newAd.id;
    }

    //modifie un ad
    @Mutation(() => Ad)
    async updateAd(@Arg("id") id: number, @Arg("data") data: AdInput) {
        let ad = await Ad.findOneByOrFail({ id });
        ad = Object.assign(ad, data, {
            tags: data.tags.map((tag) => ({ id: Number(tag) })),
        });
        await ad.save();
        return ad.id;
    }

    //supprime un ad
    @Mutation(() => ID)
    async deleteAd(@Arg("id") id: number) {
        await Ad.delete({ id });
        return id;
    }
}