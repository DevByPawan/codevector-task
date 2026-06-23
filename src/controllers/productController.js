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
            take: limit + 1,
            orderBy: [
                {
                    updated_at: "desc",
                },
                {
                    id: "desc",
                },
            ],
        });

        let hasNextPage = false;
        let nextCursor = null;

        if (products.length > limit) {
            hasNextPage = true;

            const lastVisibleProduct = products[limit - 1];

            nextCursor = {
                cursorUpdatedAt: lastVisibleProduct.updated_at,
                cursorId: lastVisibleProduct.id,
            };

            products.pop();
        }

        res.json({
            count: products.length,
            hasNextPage,
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