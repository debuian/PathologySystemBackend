import { AppBaseEntity } from 'src/global/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'containers' })
export class ContainerEntity extends AppBaseEntity {
  @Column({ unique: true })
  name: string;
}
