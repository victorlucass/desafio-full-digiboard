export interface Payment {
  id?: number;
  productId: number;
  userId: number;
  quantity: number;
  dateDelivered?: Date;
}
