
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {


    const roles = [
        {
          name: "owner",
          status: true
        }
      ];
    
      for (const role of roles) {
        await prisma.role.upsert({
          where: { name: role.name },
          update: {},
          create: {
            name: role.name,
            status: role.status
          
    
    
          },
        });
      }
  // Define countries
  const countries = [
    { name: 'United States', symbol: 'US', status: true },
    { name: 'Canada', symbol: 'CA', status: true },
    { name: 'United Kingdom', symbol: 'UK', status: true },
  ];

  // Upsert countries
  for (const country of countries) {
    await prisma.country.upsert({
      where: { name: country.name },
      update: {},
      create: {
        name: country.name,
        symbol: country.symbol,
        status: country.status,
      },
    });
  }

  // Retrieve country IDs
  const us = await prisma.country.findUnique({ where: { name: 'United States' } });
  const ca = await prisma.country.findUnique({ where: { name: 'Canada' } });
  const uk = await prisma.country.findUnique({ where: { name: 'United Kingdom' } });

  if (!us || !ca || !uk) {
    throw new Error('Countries not found');
  }

  // Define cities
  const cities = [
    { name: 'New York', symbol: 'NYC', countryId: us.id, status: true },
    { name: 'Los Angeles', symbol: 'LA', countryId: us.id, status: true },
    { name: 'Toronto', symbol: 'TO', countryId: ca.id, status: true },
    { name: 'Vancouver', symbol: 'VAN', countryId: ca.id, status: true },
    { name: 'London', symbol: 'LDN', countryId: uk.id, status: true },
    { name: 'Manchester', symbol: 'MCR', countryId: uk.id, status: true },
  ];

  // Upsert cities
  for (const city of cities) {
    const existingCity = await prisma.city.findFirst({
      where: {
        name: city.name,
        countryId: city.countryId,
      },
    });

    if (existingCity) {
      await prisma.city.update({
        where: { id: existingCity.id },
        data: {
          symbol: city.symbol,
          status: city.status,
        },
      });
    } else {
      await prisma.city.create({
        data: {
          name: city.name,
          symbol: city.symbol,
          countryId: city.countryId,
          status: city.status,
        },
      });
    }
  }
}


main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
