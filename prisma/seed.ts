import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            avatarUrl: 'https://github.com/VictorDolzan.png',
        }
    });

    const pool = await prisma.pool.create({
        data: {
            title: 'Example pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-02T12:00:00.195Z',
            firstTeamCountryCode: 'DE',
            secountTeamCountryCode: 'BR'
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.195Z',
            firstTeamCountryCode: 'BR',
            secountTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secoundTeamPoints: 1,
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    });
}

main()