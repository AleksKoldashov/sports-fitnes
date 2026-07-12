export declare class GetMemberEventsQueryDto {
    status?: 'PENDING' | 'CONFIRMED' | 'DECLINED' | 'COMPLETED' | 'CANCELLED_BY_USER';
    limit: number;
    offset: number;
}
