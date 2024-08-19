import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EscuelaModule } from './escuela/escuela.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'escolar',
      synchronize: false,
      entities: ['dist/**/*.entity.js'],
      logging: 'all',
    }),
    CiudadModule,
    EstudianteModule,
    ProfesorModule,
    EscuelaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
