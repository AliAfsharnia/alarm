export class AlarmReadModel {
    id: string;
    name: string;
    severity: string;
    isAcknowledged: boolean;
    triggeredAt: Date;
    items: Array<{
        name: string;
        type: string;
    }>; 
}