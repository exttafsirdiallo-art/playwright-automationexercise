import { faker } from "@faker-js/faker";

// Génère un user unique à chaque exécution
export function createUser() {
  const firstName = faker.person.firstName();
  const uniqueId = Date.now();

  return {
    name: firstName,
    email: `${faker.internet.username({ firstName }).toLowerCase()}_${uniqueId}@example.com`,
  };
}
