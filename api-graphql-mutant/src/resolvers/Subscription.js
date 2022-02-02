const
    // LINK
    newMutantSubscription = (parent, args, context, info) => {
        return context.prisma.$subscribe.mutant({ mutation_in: ['CREATED'] }).node()
    },
    newMutant = {
        subscribe: newMutantSubscription,
        resolve: payload => payload
    }
    // VOTE
    newHumanSubscription = (parent, args, context, info) => {
        return context.prisma.$subscribe.human({ mutation_in: [ 'CREATED' ]} ).node();
    },
    newHuman = {
        subscribe: newHumanSubscription,
        resolve: payload => payload
    };



module.exports = {
    newMutant,
    newHuman
}