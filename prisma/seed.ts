const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    // Seed data
    const usersData = [
        { name: 'John Doe' },
        { name: 'Jane Smith' },
        { name: 'Bob Johnson' },
    ];

    // Create users
    for (const userData of usersData) {
        await prisma.user.create({
            data: {
                ...userData,
            },
        });
    }

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
