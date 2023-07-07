import AuthRepository from "../AuthRepository";
import ContactRepository from "../ContactRepository";

const repositories: any = {
  auth: AuthRepository,
  contact: ContactRepository,
};

const RepositoryFactory = {
  get: (name: string) => repositories[name],
};

export { repositories, RepositoryFactory };
