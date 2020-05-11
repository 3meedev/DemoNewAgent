export class Order {
  idOrder: string;
  idProduct: string;
  nameProduct: string;
  amountProduct: string;
  priceOrder: string;
  nameUser: string;
  telUser: string;
  addressUser: string;
  dateOrder: string;
  sendDate: string;
  status: string;
  priceProduct: string;
}
export class receipt {
  idReceipt: string;
  dataOrder: Order[];
  status: string;
  file: string;
  date: string;
}