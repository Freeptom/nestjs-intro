import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: '192.168.0.123',
  port: 5432,
  username: '',
  password: '',
  database: '',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
});
