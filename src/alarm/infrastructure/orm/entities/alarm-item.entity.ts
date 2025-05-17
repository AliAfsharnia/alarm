import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { AlarmEntity } from "./alarm.entity";
import { Alarm } from "src/alarm/domain/alarm";

@Entity('alarm-items')
export class AlarmItemsEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @ManyToOne(()=> AlarmEntity, (Alarm) => Alarm.items)
    alarm: AlarmEntity;
}