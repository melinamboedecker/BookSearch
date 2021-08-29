const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ 
              _id: context.user._id 
          })
        //   .populate('savedBooks');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      saveBook: async (parent, { Book }, context) => {
        if (context.user) {
          const newbookUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { XXXXX: book }},
              { new: true, runValidators: true }
          );

  
          return newbookUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    //   addComment: async (parent, { Book  }, context) => {
    //     if (context.user) {
    //       return Thought.findOneAndUpdate(
    //         { _id: thoughtId },
    //         {
    //           $addToSet: {
    //             comments: { commentText, commentAuthor: context.user.username },
    //           },
    //         },
    //         {
    //           new: true,
    //           runValidators: true,
    //         }
    //       );
    //     }
    //     throw new AuthenticationError('You need to be logged in!');
    //   },
    //   removeThought: async (parent, { thoughtId }, context) => {
    //     if (context.user) {
    //       const thought = await Thought.findOneAndDelete({
    //         _id: thoughtId,
    //         thoughtAuthor: context.user.username,
    //       });
  
    //       await User.findOneAndUpdate(
    //         { _id: context.user._id },
    //         { $pull: { thoughts: thought._id } }
    //       );
  
    //       return thought;
    //     }
    //     throw new AuthenticationError('You need to be logged in!');
    //   },
    //   removeComment: async (parent, { thoughtId, commentId }, context) => {
    //     if (context.user) {
    //       return Thought.findOneAndUpdate(
    //         { _id: thoughtId },
    //         {
    //           $pull: {
    //             comments: {
    //               _id: commentId,
    //               commentAuthor: context.user.username,
    //             },
    //           },
    //         },
    //         { new: true }
    //       );
    //     }
    //     throw new AuthenticationError('You need to be logged in!');
    //   },
    },
  };
  
  module.exports = resolvers;