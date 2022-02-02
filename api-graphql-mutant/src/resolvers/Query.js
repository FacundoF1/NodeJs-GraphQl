const stats = async ( parent, args, context, info ) => {
    const  
        // ADN: {“count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4}

        where = args.filter ? {
            OR: []
        } : {},

        count_human_dna = await context.prisma
            .humansConnection({ where })
            .aggregate()
            .count();

        count_mutant_dna = await context.prisma
            .mutantsConnection({ where })
            .aggregate()
            .count();

    return {
        count_mutant_dna,
        count_human_dna
    }
}

module.exports = {
    stats,
}