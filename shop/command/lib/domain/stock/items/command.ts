export type StockItemCommand = CreateStockItemCommand | UpdateStockItemCommand;

export type CreateStockItemCommand = {
  accountId: string;
  name: string;
};

export type UpdateStockItemCommand = {
  name: string;
};