
export interface TaskDto {
  id: number;
  clientId: number;
  subject: string;
  description: string;
  message: string;
  status: string;
  startDate: string;
  endDate: string;
  warning: string;
  error: string;
}
