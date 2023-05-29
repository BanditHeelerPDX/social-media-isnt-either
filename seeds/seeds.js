const mongoose = require('mongoose');
const { User, Thought } = require('../models');

mongoose.connect('mongodb://localhost:27017/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedUsers = [
    {
        username: 'MarvinGaye',
        email: 'marvin@whogotsoul.com',
        thoughts: [],
        friends: [],
    },
    {
        username: 'StevieWonder',
        email: 'stevie@canyouseeme.com',
        thoughts: [],
        friends: [],
    },
    {
        username: 'DianaRoss',
        email: 'diana@supremesoul.com',
        thoughts: [],
        friends: [],
    },
    {
        username: 'BarryWhite',
        email: 'barry@soulsodeep.com',
        thoughts: [],
        friends: [],
    },
    {
        username: 'ArethaFranklin',
        email: 'aretha@soul-o.com',
        thoughts: [],
        friends: [],
    },
    {
        username: 'OtisRedding',
        email: 'otis@docksoul.com',
        thoughts: [],
        friends: [],
    },
    {
        username: 'JamesBrown',
        email: 'james@nissinsoul.com',
        thoughts: [],
        friends: [],
    },
    {
        username: 'TinaTurner',
        email: 'ike@justike.com',
        thoughts: [],
        friends: [],
    },
];

const seedThoughts = async (userId, username, thoughts) => {
    try {
        for (const thoughtText of thoughts) {
            const thought = await Thought.create({ thoughtText, username });

            const user = await User.findByIdAndUpdate(
                userId,
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            console.log(`Thought seeded for user ${user.username}`);
        }
    } catch (err) {
        console.log('Thought seeding failed', err);
    }
};

const seedDatabase = async () => {
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});

        const users = await User.insertMany(seedUsers);
        console.log('Users seeded');

        await seedThoughts(users[0]._id, users[0].username, [
            'I heard it through the grapevine',
            'What\'s going on?',
            'Let\'s get it on',
        ]);

        await seedThoughts(users[1]._id, users[1].username, [
            'Signed, sealed, delivered',
            'Isn\'t she lovely?',
            'You are the sunshine of my life',
        ]);

        await seedThoughts(users[2]._id, users[2].username, [
            'Stop! In the name of love',
            'I\'m coming out',
            'Upside down, you turn me',
        ]);

        await seedThoughts(users[3]._id, users[3].username, [
            'Can\'t get enough of your love, babe',
            'You\'re the first, the last, my everything',
            'Never, never gonna give you up',
        ]);

        await seedThoughts(users[4]._id, users[4].username, [
            'R-E-S-P-E-C-T',
            'Chain, chain, chain, chain of fools',
            'You make me feel like a natural woman',
        ]);

        await seedThoughts(users[5]._id, users[5].username, [
            'Sittin\' on the dock of the bay',
            'Try a little tenderness',
            'These arms of mine, they are lonely',
        ]);

        await seedThoughts(users[6]._id, users[6].username, [
            'I feel good',
            'Papa\'s got a brand new bag',
            'Get up offa that thing',
        ]);

        await seedThoughts(users[7]._id, users[7].username, [
            'Proud Mary keep on burnin\'',
            'What\'s love got to do with it?',
            'You\'re simply the best',
        ]);

        console.log('Thoughts seeded');
        mongoose.connection.close();
    } catch (err) {
        console.log('Database seeding failed', err);
    }
};

seedDatabase();