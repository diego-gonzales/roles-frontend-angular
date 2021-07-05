// Generated by https://quicktype.io

export interface ProductsResponse {
    ok:       boolean;
    products?: Product[];
    product?: Product;
};

export interface Product {
    _id?:       string;
    name:      string;
    price:     number;
    imageURL?:  string;
    stock:     number;
    status:    number;
    category?:  Category;
    createdAt?: string;
    updatedAt?: string;
};

export interface Category {
    _id?:       string;
    name:      string;
    createdAt?: string;
    updatedAt?: string;
};
