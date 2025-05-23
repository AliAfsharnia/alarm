export class CreateAlarmDto {
    constructor(
        public readonly name: string, 
        public readonly severity: string,
        public readonly triggeredAt: Date,
        public readonly items: Array<{
            name: string,
            type: string
        }>
        ){}
}
