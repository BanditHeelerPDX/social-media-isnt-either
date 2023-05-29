const mongoose = require('mongoose');
const Schema = mongoose;

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlenghth: 1,
        maxlength: 360,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => new Date(createdAtVal).toLocaleString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
            reactionId: {
                type: Schema.Types.ObjectId,
                default: () => new mongoose.Types.ObjectId(),
            },
            reactionBody: {
                type: String,
                required: true,
                maxlength: 360,
            },
            username: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (createdAtVal) => new Date(createdAtVal).toLocaleString(),
            },
        },
    ],
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    });

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;