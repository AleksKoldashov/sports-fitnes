// утверждения заявки (директор)
export class ApproveApplicationDto {
  applicationId: number;
  action: 'APPROVE' | 'REJECT';
  rejectionReason?: string; // если REJECT, то обязательно
}
