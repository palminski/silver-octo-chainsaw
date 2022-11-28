const User = require('../models');
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
    Query: {
        getSingleUser: async (parent,args,context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('savedBooks');
                return userData
            }
            throw new AuthenticationError('Not Logged In!');
        },
        getAllUsers: async() => {
            return User.find();
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            
            const user = await User.create(args);
            const token = signToken(user);
            console.log(user.username);
            console.log(token);
            return {token, user};
        }
    }
}

module.exports = resolvers;