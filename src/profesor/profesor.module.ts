import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { Profesor } from './entities/profesor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomiciliosProfesor } from 'src/domicilios-profesor/entities/domicilios-profesor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor,DomiciliosProfesor])],
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}
