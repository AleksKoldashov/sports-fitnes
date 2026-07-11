export declare class ApproveApplicationDto {
    applicationId: number;
    action: 'APPROVE' | 'REJECT';
    rejectionReason?: string;
}
