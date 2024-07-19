export interface IUser {
  id: id;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

enum ECategory {}

type id = string | number;

export interface Iimage {
  id: id;
  link: string;
  altTxt: string;
}

export interface IRecepy {
  id: id;
  images: Iimage[];
  name: string;
  description: string;
  cookTimer: string;
  kkal: number; // ккалории на 100 грамм
  fat: number; // жиры
  carbs: number; // углеводы
  protein: number; // белки

  totalWeight: number; // в мг

  categories: string[];
  ingredients: IIngredientsRecepy[];
}

export interface IIngredientsRecepy extends IIngredient {
  weight: number | undefined; // мг
  count: number | undefined; // штук
}

export interface IIngredient {
  id: id;
  name: string;
}
