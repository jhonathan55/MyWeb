export interface ProductI {
    id: number;
    name: string;
    description: string;
    createDateAt: Date;
    updateDateAt: Date;
    qty: number;
    price: number;
    categories: CategoryI[];
}
export interface CategoryI {
    id: number;
    name: string;
    createDateAt: Date;
    updateDateAt: Date;
}
