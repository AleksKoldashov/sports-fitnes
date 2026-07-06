import { CreateTrainerDto } from './dto/create-trainer.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class TrainersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTrainerDto: CreateTrainerDto): import(".prisma/client").Prisma.Prisma__TrainerClient<{
        name: string;
        specialty: string;
        experience: number;
        createdAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        specialty: string;
        experience: number;
        createdAt: Date;
        id: number;
    }[]>;
}
