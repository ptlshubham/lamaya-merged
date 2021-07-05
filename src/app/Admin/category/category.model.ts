export class Category{
    constructor(
        public id ?: number,
        public name ?:string,
        public parent ?:number,
        public bannersimage?:string,
        public createddate ?:Date,
        public updateddate?:Date,
        public isactive?:number
        
     ) {
    }
}