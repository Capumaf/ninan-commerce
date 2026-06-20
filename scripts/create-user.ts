import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = "cesar@ninancommerce.com";
  const plainPassword = "Albetito12.";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
      name: "Cesar",
      role: "admin",
    },
  });

  console.log("Usuario creado/actualizado:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));