const postedBy = ( parent, args, context ) => {
    return context.prisma.mutant({ id: parent.id }).postedBy();
};

module.exports = {
    postedBy
};