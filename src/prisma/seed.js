const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const categories = [
    "Electronics",
    "Books",
    "Fashion",
    "Sports",
    "Home",
    "Beauty",
    "Toys",
];

async function seed() {
    const TOTAL_PRODUCTS = 200000;
    const BATCH_SIZE = 5000;

    console.log("Starting seed...");

    for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {
        const products = [];

        for (let j = 0; j < BATCH_SIZE; j++) {
            products.push({
                name: faker.commerce.productName(),
                category:
                    categories[Math.floor(Math.random() * categories.length)],
                price: Number(faker.commerce.price()),
            });
        }

        await prisma.product.createMany({
            data: products,
        });

        console.log(
            `Inserted ${Math.min(i + BATCH_SIZE, TOTAL_PRODUCTS)} products`
        );
    }

    console.log("Seeding complete");
}

seed()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });