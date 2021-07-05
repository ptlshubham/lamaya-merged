export class CustomerList {
    constructor(
        public id?: number,
        public firstname?: string,
        public middlename?: string,
        public lastname?: string,
        public email?: any,
        public password?: any,
        public dateofbirth?: Date,
        public contactnumber?: number,
        public isactive?:boolean,
        // public createddate?:Date,
        // public updateddate?:Date
    ) {
    }
}