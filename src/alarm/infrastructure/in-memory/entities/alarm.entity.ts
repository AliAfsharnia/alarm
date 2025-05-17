import { AlarmItemsEntity } from "./alarm-item.entity";

export class AlarmEntity{
    id: string;
    name: string;
    severity: string;
    triggeredAt: Date;
    isAcknowLedged: boolean;
    items: Array<AlarmItemsEntity>;
}