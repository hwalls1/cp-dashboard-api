import AppDataSource from './connectToDb';
import { RoleEnumType, StatusEnumType, User } from '../entities/user.entity';

const DB = AppDataSource;

const clearDB = async () => {
  const entities = DB.entityMetadatas;
  for (const entity of entities) {
    const repository = DB.getRepository(entity.name);
    await repository.query(
      `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
    );
  }
};

const createAdmins = async () => {
  const user = new User();
  user.name = 'Alec Hammond';
  user.password = 'Hesabeast21!';
  // Hashing of password will happen via typeorm on `insert`
  user.role = RoleEnumType.ADMIN;
  user.email = 'training@connected-performance.com';
  user.verified = true;
  user.status = StatusEnumType.APPROVED;


  await DB.getRepository(User).save(user);


  const user2 = new User();
  user2.name = 'Will Nahmens';
  user2.password = 'Hesabeast21!';
  user2.role = RoleEnumType.ADMIN;
  user2.email = 'willnahmens@gmail.com';
  user2.verified = true;
  user2.status = StatusEnumType.APPROVED;


  await DB.getRepository(User).save(user2);


  const user3 = new User();
  user3.name = 'Greg Sieranski';
  user3.password = 'Hesabeast21!';
  user3.role = RoleEnumType.ADMIN;
  user3.email = 'gregory_sieranski@condenast.com';
  user3.verified = true;
  user3.status = StatusEnumType.APPROVED;
};

export const setup = async () => {
  //await clearDB();
  await createAdmins();
};
