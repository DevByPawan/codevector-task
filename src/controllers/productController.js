const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 20;
        const category = req.query.category;

        const cursorUpdatedAt = req.query.cursorUpdatedAt;
        const cursorId = req.query.cursorId;

        const where = {};

        if (category) {
            where.category = category;
        }

        if (cursorUpdatedAt && cursorId) {
            where.OR = [
                {
                    updated_at: {
                        lt: new Date(cursorUpdatedAt),
                    },
                },
                {
                    updated_at: new Date(cursorUpdatedAt),
                    id: {
                        lt: cursorId,
                    },
                },
            ];
        }

        const products = await prisma.product.findMany({
            where,
            take: limit,
            orderBy: [
                {
                    updated_at: "desc",
                },
                {
                    id: "desc",
                },
            ],
        });

        let nextCursor = null;

        if (products.length > 0) {
            const lastProduct = products[products.length - 1];

            nextCursor = {
                cursorUpdatedAt: lastProduct.updated_at,
                cursorId: lastProduct.id,
            };
        }

        res.json({
            count: products.length,
            nextCursor,
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