'use server'

import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";

/**
 * Functions of user.actions.js are used in the route.js for all event changes 
 */

export const createUser = async (user) => {
    try {
        // If we have a cached connection, it does not invoke again and again

        console.log("AM I GETTING CALLED HERE?")
        await connectToDatabase();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        // Custom error handling
        throw new Error(error.message);
    }
};

// export const getUserById = async (userId) => {
//     try {
//         await connectToDatabase();
//         const user = await User.findById(userId);

//         if (!user) handleError("User not found");
//         return JSON.parse(JSON.stringify(user));
//     } catch (error) {
//         handleError(error);
//     }
// };

export const getUserByEmail = async (email)=>{
    try{
        await connectToDatabase();
        const user = await User.findOne({user_email: email})
        if(!user) throw new Error("User not found");

        return user
    }catch(error){
        throw new Error(error.message)
    }
}

export const updateUser = async (userId, user) => {
    try {
        await connectToDatabase();

        // new: true would return the latest changed updated information
        const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });

        if (!updatedUser) throw new Error("User not found");
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        throw new Error(error.message);
    }
};

// deleteUser function
export const deleteUser = async (userId) => {
    try {
        await connectToDatabase();

        const toBeDeletedUser = await User.findOne({ clerkId: userId });
        if (!toBeDeletedUser) throw new Error("User not found");

        // Unlink the relationships in Event and Orders
        await Promise.all([
            Event.updateMany(
                { _id: { $in: toBeDeletedUser.events } },
                { $pull: { organizer: toBeDeletedUser._id } }
            ),
            // Update the 'orders' collection to remove references to the user
            Order.updateMany(
                { _id: { $in: toBeDeletedUser.orders } }, 
                { $unset: { buyer: 1 } }
            ),
        ]);

        // After unlinking, delete the user
        const deletedUser = await User.findByIdAndDelete(toBeDeletedUser._id);
        revalidatePath('/');

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        throw new Error(error.message);
    }
};
