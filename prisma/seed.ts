import prisma from "@/lib/prisma";


async function main() {
  const electronics = await prisma.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
      images: [],
    },
  });

  await prisma.subCategory.upsert({
    where: { slug: "smartphones" },
    update: {},
    create: {
      name: "Smartphones",
      slug: "smartphones",
      parentId: electronics.id,
      images: [],
    },
  });

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
