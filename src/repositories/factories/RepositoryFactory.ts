import AuthRepository from "../AuthRepository";
import ContactRepository from "../ContactRepository";
import UserRepository from "../UsersRespository";

const repositories: any = {
  auth: AuthRepository,
  contact: ContactRepository,
  user: UserRepository,
};

const RepositoryFactory = {
  get: (name: string) => repositories[name],
};

export { repositories, RepositoryFactory };
