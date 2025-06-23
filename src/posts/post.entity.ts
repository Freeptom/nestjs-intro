import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { postType } from './enums/postType.enum';
import { postStatus } from './enums/postStatus.enum';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: postType,
    default: postType.POST,
    nullable: false,
  })
  postType: postType;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: postStatus,
    default: postStatus.DRAFT,
    nullable: false,
  })
  status: postStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishedOn?: Date;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags?: Tag[];

  @OneToOne(() => MetaOption, (metaOptions) => metaOptions.post, {
    cascade: true,
  })
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
