export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CreateProductData {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: number;
}

export type SortField = "price" | "rating";
export type SortOrder = "asc" | "desc";
