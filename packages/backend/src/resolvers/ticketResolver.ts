import {
    Arg,
    Args,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
    ID,
    FieldResolver,
} from 'type-graphql'
import { Ticket, TicketModel } from '../entities/ticketEntity'

@Resolver(Ticket)
export class RecipeResolver {
    @Query((returns) => Ticket, { nullable: true })
    recipe(@Arg('recipeId', (type) => ID) recipeId: ObjectId) {
        return TicketModel.findById(recipeId)
    }

    @Query((returns) => [Ticket])
    async recipes(): Promise<Ticket[]> {
        return await RecipeModel.find({})
    }

    @Mutation((returns) => Recipe)
    async addRecipe(
        @Arg('recipe') recipeInput: RecipeInput,
        @Ctx() { user }: Context
    ): Promise<Recipe> {
        const recipe = new RecipeModel({
            ...recipeInput,
            author: user._id,
        } as Recipe)

        await recipe.save()
        return recipe
    }

    @Mutation((returns) => Recipe)
    async rate(@Arg('rate') rateInput: RateInput, @Ctx() { user }: Context): Promise<Recipe> {
        // find the recipe
        const recipe = await RecipeModel.findById(rateInput.recipeId)
        if (!recipe) {
            throw new Error('Invalid recipe ID')
        }

        // set the new recipe rate
        const newRate: Rate = {
            value: rateInput.value,
            user: user._id,
            date: new Date(),
        }

        // update the recipe
        recipe.ratings.push(newRate)
        await recipe.save()
        return recipe
    }

    @FieldResolver()
    async author(@Root() recipe: Recipe): Promise<User> {
        return (await UserModel.findById(recipe.author))!
    }
}
