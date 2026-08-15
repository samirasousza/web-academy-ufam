export type CartItem = {
  productId: string;
  quantity: number;
};

export interface AddCartItemDto {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}
