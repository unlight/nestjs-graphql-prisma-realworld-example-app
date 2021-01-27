import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from 'app_modules/all-exceptions-filter';
import { useContainer } from 'class-validator';

import { AppEnvironment } from './app.environment';
import { AppModule } from './app.module';

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // todo: errors
}

export async function createApp(options?: NestApplicationOptions) {
    const app = await NestFactory.create(AppModule, options);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            validationError: {
                target: false,
            },
        }),
    );
    app.useGlobalFilters(new AllExceptionsFilter());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    return app;
}

async function main() {
    const app = await createApp();
    const appEnvironment = app.get(AppEnvironment);

    await app.listen(appEnvironment.port);

    app.get(Logger).log(
        `GraphQL application is running on: ${await app.getUrl()}`,
        'main',
    );

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

if (process.env.NODE_ENV !== 'test') {
    void main();
}
