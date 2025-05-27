import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotifyFacilitySupervisorCommand } from "./notify-facility-supervisor.command";
import { Logger } from "@nestjs/common";

@CommandHandler(NotifyFacilitySupervisorCommand)
export class NotifyFacilitySupervisorCommandHandler 
implements ICommandHandler<NotifyFacilitySupervisorCommand>
{
    private readonly logger = new Logger(NotifyFacilitySupervisorCommandHandler.name)

    async execute(command: NotifyFacilitySupervisorCommand): Promise<any> {
         this.logger.debug(
         `processing "NotifyFacilitySupervisorCommandHandler": 
         ${JSON.stringify(command)}`
         )

         console.table('notification for supervisor')
    }
}