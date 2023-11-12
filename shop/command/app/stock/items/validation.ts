import { Result, createSuccess, createError, pipe } from '@/lib/fp/result';
import { paths } from '@/schemas/stock';

type RequestBody = paths['/stock/items']['post']['requestBody']['content']['application/json'];
type StockItemCommand = {
  type: 'valid';
  body: RequestBody;
}
export function validation(request: RequestBody): Result<StockItemCommand> {
  return pipe(
    request,
    validateName
  );
}

function validateName(request: RequestBody): Result<StockItemCommand> {
  if (!request.name) {
    return createError(new Error('name is required'), request);
  }

  return createSuccess({ type: 'valid', body: request });
}