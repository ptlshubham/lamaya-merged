export class Userorders {
    constructor(
        public id?: number,
        public username?:any,
        public userid?: any,
        public addressid?: number,
        public productid?: any[],
        public transactionid?: number,
        public parentid?: number,
        public modofpayment?: any,
        public orderdate?: Date,
        public deliverydate?: Date,
        public createddate?: Date,
        public updateddate?: Date,
        public total?:any,
        public status?:any,
        public quantity?:any,
        public size?: any,
        public addSelectFields?:any[],
        public soldquantity?:any,
        public stockdate?:Date

    ) {
    }
}