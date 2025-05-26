import { Module } from '@nestjs/common';
import { SharedInfraStructureModule } from './infrastructure/shared-infrastructure.module';
import { AggregateRehydrator } from './application/aggregate-rehydrator';

@Module({
    imports: [SharedInfraStructureModule],
    providers: [SharedInfraStructureModule, AggregateRehydrator],
    exports: [AggregateRehydrator]
})
export class SharedModule {}
