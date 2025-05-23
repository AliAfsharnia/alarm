import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { AlarmItemsEntity } from "./alarm-item.entity";

@Entity('alarms')
export class AlarmEntity{
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    severity: string;

    @Column({nullable: true})
    triggeredAt: Date;

    @Column({default: false})
    isAcknowLedged: boolean;

    @OneToMany(() => AlarmItemsEntity, (item) => item.alarm, {cascade: true, nullable: true})
    items: AlarmItemsEntity[];
}