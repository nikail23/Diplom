export interface ProductsParameters {
  direction: DirectionType;
  page: number;
  size: number;
  sortProperty: SortPropertyType;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number[];
}

export interface FiltersParameters {
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number[];
}

export enum DirectionType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortPropertyType {
  PRICE = 'price',
  NAME = 'name',
}

export interface SortParameters {
  direction: DirectionType,
  sortProperty: SortPropertyType,
}

export const sorts = {
  nameAsc: {
    sortProperty: SortPropertyType.NAME,
    direction: DirectionType.ASC,
  },
  nameDesc: {
    sortProperty: SortPropertyType.NAME,
    direction: DirectionType.DESC,
  },
  priceAsc: {
    sortProperty: SortPropertyType.PRICE,
    direction: DirectionType.ASC,
  },
  priceDesc: {
    sortProperty: SortPropertyType.PRICE,
    direction: DirectionType.DESC,
  },
};
