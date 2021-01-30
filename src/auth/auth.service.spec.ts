import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { createMock } from 'ts-auto-mock';
import { instance, mock } from 'ts-mockito';

import { AppEnvironment } from '../app.environment';
import { AuthService } from './auth.service';

interface Interface {
    a: string;
    b: number;
}

describe('AuthService', () => {
    let service: AuthService;
    const jwtService = mock(JwtService);
    const appEnvironment = mock(AppEnvironment);

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: instance(jwtService),
                },
                {
                    provide: AppEnvironment,
                    useValue: instance(appEnvironment),
                },
            ],
        }).compile();

        service = module.get(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // it('should be defined in another way', () => {
    //     const mock = createMock<Interface>();
    //     console.log('mock', mock);
    //     expect(mock.a).toBe('');
    //     // const jwtService = createMock<JwtService>();
    //     // console.log('jwtService', jwtService);
    //     // const appEnvironment = createMock<AppEnvironment>();
    //     // console.log('appEnvironment', appEnvironment);
    //     // service = new AuthService();
    // });
});

describe('a mock that', () => {
    let mock: Interface;

    beforeEach(() => {
        mock = createMock<Interface>();
    });

    it('should work', () => {
        expect(mock.a).toBe('');
    });
});
