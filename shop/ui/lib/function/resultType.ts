// 成功した結果を表す型
export type SuccessResult<T> = {
  success: true;
  value: T;
};

// エラーを表す型
export type ErrorResult = {
  success: false;
  error: Error;
};

// Result型: 成功した場合はSuccessResult、エラーの場合はErrorResultとなるUnion Type
export type Result<T> = SuccessResult<T> | ErrorResult;

// 成功した結果を作成するヘルパー関数
export function createSuccess<T>(value: T): SuccessResult<T> {
  return { success: true, value };
}

// エラーを作成するヘルパー関数
export function createError(error: Error): ErrorResult {
  return { success: false, error };
}

// パイプラインを実現するpipe関数
export function pipe<T, R>(value: T, ...fns: ((x: T) => Result<R>)[]): Result<R> {
  return fns.reduce((result: Result<any>, fn) => {
    return result.success ? fn(result.value) : result;
  }, createSuccess(value));
}