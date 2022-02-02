const 
    postMutant = async (parent, args, context, info) => {
        const { id } = await context.prisma.createAdn({});
        for( let seq of args.input.value ){
            await context.prisma.createSequence( {
                value: seq,
                adn: { connect: { id: id } }
            } );
        }
        return context.prisma.createMutant( {
            postedBy: { connect: { id: id } }
        } );
    },

    postHuman = async (parent, args, context, info) => {
        const { id } = await context.prisma.createAdn({});
        for( let seq of args.input.value ){
            await context.prisma.createSequence( {
                value: seq,
                adn: { connect: { id: id } }
            } );
        }
        return context.prisma.createHuman( {
            postedBy: { connect: { id: id } }
        } );
    };

module.exports = {
    postMutant,
    postHuman
}