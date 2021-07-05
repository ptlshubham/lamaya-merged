export class QuantityWithSize {
    constructor(
        public id?: any,
        public productid?: any,
        public quantity?: any,
        public size?: any,
        public color?: any,
        public addSelectFields?:any[],
        public soldquantity?:any,
        public stockdate?:Date
    ) {
    }
}