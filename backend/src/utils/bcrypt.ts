import * as bcrypt from 'bcrypt';

const encrypt = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const compare = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword);
};

export { encrypt, compare };
