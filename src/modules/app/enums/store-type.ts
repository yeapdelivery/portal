enum StoreTypeEnum {
  RESTAURANT = "Restaurant",
  GROCERY_STORE = "Grocery Store",
}

export const StoreTypeEnumMap: Record<StoreTypeEnum, string> = {
  [StoreTypeEnum.GROCERY_STORE]: "Mercado",
  [StoreTypeEnum.RESTAURANT]: "Restaurante",
};

export default StoreTypeEnum;
