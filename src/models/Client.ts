import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  telephone: string;

  @Column()
  cpf: string;

  @Column()
  @Generated('uuid')
  code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Client;
