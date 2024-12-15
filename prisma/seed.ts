import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise-cancellation.",
      tags: ["electronics", "audio", "headphones"],
      price: 99.99,
    },
    {
      name: "Gaming Laptop",
      description:
        "Powerful laptop designed for gaming with high-performance graphics.",
      tags: ["electronics", "laptop", "gaming"],
      price: 1499.99,
    },
    {
      name: "Running Shoes",
      description:
        "Lightweight running shoes with excellent grip and cushioning.",
      tags: ["sports", "shoes", "running"],
      price: 59.99,
    },
    {
      name: "Smartwatch",
      description:
        "Feature-rich smartwatch with health tracking and notifications.",
      tags: ["electronics", "wearable", "smartwatch"],
      price: 199.99,
    },
    {
      name: "Backpack",
      description:
        "Durable backpack with multiple compartments and water resistance.",
      tags: ["accessories", "travel", "backpack"],
      price: 39.99,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        tags: product.tags.join(","), // Prisma will automatically handle JSON or string arrays
        price: product.price,
      },
    });
  }

  console.log("Dummy data added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
