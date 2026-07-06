import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
export declare class TrainersController {
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TrainerClient<{
        name: string;
        specialty: string;
        experience: number;
        createdAt: Date;
        id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateTrainerDto: UpdateTrainerDto): import(".prisma/client").Prisma.Prisma__TrainerClient<{
        name: string;
        specialty: string;
        experience: number;
        createdAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TrainerClient<{
        name: string;
        specialty: string;
        experience: number;
        createdAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
