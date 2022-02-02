const postedBy = ( parent, args, context ) => {
    return context.prisma.human({ id: parent.id }).postedBy();
};

module.exports = {
    postedBy
};