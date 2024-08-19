import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscuelaService } from './escuela.service';
import { EscuelaController } from './escuela.controller';
import { Escuela } from './entities/escuela.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadModule } from 'src/ciudad/ciudad.module';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela, Ciudad]), CiudadModule],
  providers: [EscuelaService],
  controllers: [EscuelaController],
})
export class EscuelaModule {}
