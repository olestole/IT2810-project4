export type RootStackParamList = {
  Overview: undefined;
  Detail: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Overview: undefined;
  Profile: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type ProfileParamList = {
  Profile: undefined;
};

export interface Product {
  Varenavn: string;
  Varenummer: string;
  Varetype: string;
  Produsent: string;
  Volum: number;
  Pris: number;
  Land?: string;
  Farge?: string;
  Lukt?: string;
  Smak?: string;
}

export interface IReview {
  userEmail?: string;
  varenummer: string;
  title: string;
  description: string;
  rating: number;
}
