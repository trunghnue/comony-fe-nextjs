import ContactRepository from "../ContactRepository";

const repositories: any = {
  contact: ContactRepository,
};

const RepositoryFactory = {
  get: (name: string) => repositories[name],
};

export { repositories, RepositoryFactory };
