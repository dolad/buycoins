import { Transaction } from "../entities/Transaction";
import { Resolver, Mutation, Arg, Query,  FieldResolver, Root  } from "type-graphql";
import { User} from "../entities/User";
import { UserInput } from "../interface/user.input";
import {UserModel,TransactionModel} from '../entities/model'
@Resolver(_of => User) 
export class UserResolver {

    @Query(_returns => User, { nullable: false})
    async returnSingleUser(@Arg("id") id: string){
      return await UserModel.findById({_id:id});
    };

    @Query(() => [User])
    async returnAllUsers(){
      return await UserModel.find();
    };

    @Mutation(() => User)
    async createUser(@Arg("data"){email,first_name,last_name,phone}: UserInput): Promise<User> { 
        console.log(email,last_name,first_name,phone)
        const user = (await UserModel.create({      
          first_name,
          email,
          last_name,  
          phone
      })).save();
      return user;
    };

   @Mutation(() => Boolean)
   async deleteUser(@Arg("id") id: string) {
    await UserModel.deleteOne({id});
    return true;
  }

  @FieldResolver(_type => (Transaction))
  async transaction(@Root() user: User): Promise<Transaction> {
    console.log(user, "userr!")
    return (await TransactionModel.findById(user._doc.transaction_id))!;
  }


}
