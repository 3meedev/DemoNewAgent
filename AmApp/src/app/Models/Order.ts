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
    userOrder: string
    status: string;
    costProduct: string;
    priceProduct:string;
    file: string;
}

export class DataOrder {

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
    userOrder: string
    status: string;
    costProduct: string;
    priceProduct:string;
    file: string;
}

export class receipt {

    idReceipt: string;
    dataOrder: Order[];
    status: string;
    file: string;
    date: string;
    statusFile: string;

}

