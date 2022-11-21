// export interface ProductI {
//     id: number;
//     name: string;
//     description: string;
//     createDateAt: Date;
//     updateDateAt: Date;
//     qty: number;
//     price: number;
//     categories: CategoryI[];
// }
// export interface CategoryI {
//     id: number;
//     name: string;
//     createDateAt: Date;
//     updateDateAt: Date;
// }
export interface ProductI {
    id: Object;
    name: string;
    description: string;
    qty: number;
    price: number;
    image: string;
    createDateAt: Date;
    updateDateAt: Date;
   
    categories: CategoryI[];
}
export interface CategoryI {
    id: number;
    name: string;
    createDateAt: Date;
    updateDateAt: Date;
}