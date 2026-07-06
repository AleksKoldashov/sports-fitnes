"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PostsService = class PostsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(CreatePostsDto) {
        return await this.prisma.posts.create({
            data: CreatePostsDto,
        });
    }
    async findAll() {
        return await this.prisma.posts.findMany();
    }
    async findOne(id) {
        const post = await this.prisma.posts.findUnique({
            where: { id },
        });
        if (!post) {
            throw new common_1.NotFoundException(`Пост с ID ${id} не найден`);
        }
        return post;
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.posts.delete({
            where: { id },
        });
    }
    async update(id, updatePostsDto) {
        await this.findOne(id);
        return await this.prisma.posts.update({
            where: { id },
            data: updatePostsDto,
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map