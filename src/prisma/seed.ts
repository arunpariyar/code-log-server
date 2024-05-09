import { feedbacks } from './dev-data.js/feedback-mocks';
import prisma from '../db';

async function main() {
  //   await prisma.feedback.deleteMany({});

  for (let feedback of feedbacks) {
    await prisma.feedback.create({ data: feedback });
  }
}

main()
  .catch((err) => {
    console.log(`The was problem when seeding the database 🔥`);
    console.log(err);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
