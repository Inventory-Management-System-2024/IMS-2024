export default interface OrderElement {
  user: {
    name: String,
    email: String
  },
  orderItems: [{
    quantity: number,
    product: {
      productName: String,
    }
    _id: string
  }],
  orderStatus: string;
  totalPrice: number;
  paidAt: String;
}