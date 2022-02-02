const 
    sequences = ( parent, args, context ) => {
        return context.prisma.adn({ id: parent.id }).sequences();
    };
 
module.exports = {
    sequences
};