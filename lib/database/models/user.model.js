import {Schema, model, models} from 'mongoose'; 

const UserSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: false
    },
    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    }
},{
    timestamps: true,
    collection: 'rp-users'
});

//Use a consistent model name and avoid re-compiling the model 
const User = models.User || model('rp-users', UserSchema);

export default User;
