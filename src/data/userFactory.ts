import { faker } from "@faker-js/faker";

// Genere un user unique à chaque exécution

export function createUser() {
  const firstName = faker.person.firstName();
  return {
    name: firstName,
    email: faker.internet.email({ firstName }).toLowerCase(),
  };
}
