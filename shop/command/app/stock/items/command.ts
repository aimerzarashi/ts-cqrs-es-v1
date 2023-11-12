export type StockItemCommand = CreateStockItem | UpdateStockItem;

export type CreateStockItem = {
  type: 'Create'
  name: string
  accountId: string
}

export type UpdateStockItem = {
  type: 'Update'
  name: string
}