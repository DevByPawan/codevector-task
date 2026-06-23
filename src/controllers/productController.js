const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const skip = (page - 1) * limit;

        const products = await prisma.product.findMany({
            skip,
            take: limit,
            orderBy: {
                updated_at: "desc",
            },
        });

        const total = await prisma.product.count();

        res.json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: products,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    getProducts,
};