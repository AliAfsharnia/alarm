import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AcknowledgeAlarmCommand } from "./acknowledged-alarm.command";
import { Logger } from "@nestjs/common";
import { AggregateRehydrator } from "src/shared/application/aggregate-rehydrator";
import { Alarm } from "src/alarm/domain/alarm";

@CommandHandler(AcknowledgeAlarmCommand)
export class AcknowledgedAlarmCommandHandler
    implements ICommandHandler<AcknowledgeAlarmCommand>
{
    private readonly logger = new Logger(AcknowledgedAlarmCommandHandler.name)  
 
    constructor(private readonly aggregateRehydrator: AggregateRehydrator ){}

    async execute(command: AcknowledgeAlarmCommand){
        this.logger.debug(
            `Processing "AcknowledgeAlarmCommand": ${JSON.stringify(command)}`
        );

        const alarm = await this.aggregateRehydrator.rehydrate(command.alarmId, Alarm);

        alarm.acknowledge();
        alarm.commit();

        return alarm;
    } 
}