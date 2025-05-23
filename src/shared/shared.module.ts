import { Module } from '@nestjs/common';
import { SharedInfraStructureModule } from './infrastructure/shared-infrastructure.module';

@Module({
    imports: [SharedInfraStructureModule],
    providers: [SharedInfraStructureModule]
})
export class SharedModule {}
