import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';


async function start() {
    
    const PORT = 7000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    
    await app.listen(PORT, () => console.log('Server started on port ' + PORT));

}

start(); 