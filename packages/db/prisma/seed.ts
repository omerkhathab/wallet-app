import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {
  const omer = await db.user.upsert({
    where: { number: '99999' },
    update: {},
    create: {
      number: '99999',
      // password is 123
      password: '$2b$10$hv6UGD0RIjcv5llqI3Ovu.KMhSoFRR.5yAgMKmpraGKRoNweIyFcW',
      name: 'omer',
      Transaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          provider: "HDFC Bank"
        }
      }
    }
  })
  const khathab = await db.user.upsert({
    where: { number: '88888' },
    update: {},
    create: {
      number: '88888',
      // password is 123
      password: '$2b$10$hv6UGD0RIjcv5llqI3Ovu.KMhSoFRR.5yAgMKmpraGKRoNweIyFcW',
      name: 'khathab',
      Transaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          provider: "ICICI Bank",
        },
      },
    },
  })
  console.log({ omer, khathab })
}

main().then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })