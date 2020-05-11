export class product{
    idProduct:string;

    nameProduct:string;

    typeProduct:string;

    priceProduct:string;

    costProduct:string;

    totalProduct:string;

    unitProduct:string;

    statusclear:String;
    
    total:String;

    amountProduct:String;

    statusProduct:String;

    statusCheck:Boolean;
    showTotal:number;
    showDate: Date
    totalShow:string;
    buttonCheck :Boolean;
    idStock: string;
    dataProductPerMonth: product[];
    stockPerMonth: Date
    
}
export class dataStockPerMonth {

    idStock: string;
    dataProductPerMonth: product[];
    stockPerMonth: Date

}
