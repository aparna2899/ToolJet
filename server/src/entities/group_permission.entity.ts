import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppGroupPermission } from './app_group_permission.entity';
import { Organization } from './organization.entity';
import { UserGroupPermission } from './user_group_permission.entity';

@Entity({ name: 'group_permissions' })
export class GroupPermission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id' })
  organizationId: string;

  @Column()
  group: string;

  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Organization, (organization) => organization.id)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @OneToMany(() => UserGroupPermission, (userGroupPermission) => userGroupPermission.groupPermission)
  userGroupPermission: UserGroupPermission[];

  @OneToMany(() => AppGroupPermission, (appGroupPermission) => appGroupPermission.groupPermission)
  appGroupPermission: AppGroupPermission[];
}