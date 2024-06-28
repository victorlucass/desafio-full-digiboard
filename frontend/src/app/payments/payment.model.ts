export interface Payment {
  id?: string;
  productId: string;
  userId: string;
  quantity: number;
  dateDelivered?: Date;
}
