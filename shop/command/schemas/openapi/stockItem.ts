/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/stock/items": {
    /** Register stock item */
    post: {
      requestBody: components["requestBodies"]["StockItem"];
      responses: {
        /** @description Created */
        201: {
          content: never;
        };
        /** @description Bad request */
        400: {
          content: never;
        };
        /** @description Unauthorized */
        401: {
          content: never;
        };
        /** @description Internal Server Error */
        500: {
          content: never;
        };
      };
    };
  };
  "/stock/items/{stockId}": {
    /** Update stock item */
    put: {
      parameters: {
        path: {
          stockId: string;
        };
      };
      requestBody: components["requestBodies"]["StockItem"];
      responses: {
        /** @description OK */
        200: {
          content: never;
        };
        /** @description Bad request */
        400: {
          content: never;
        };
        /** @description Unauthorized */
        401: {
          content: never;
        };
        /** @description Not Found */
        404: {
          content: never;
        };
        /** @description Internal Server Error */
        500: {
          content: never;
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: never;
  responses: never;
  parameters: never;
  requestBodies: {
    StockItem: {
      content: {
        "application/json": {
          name: string;
        };
      };
    };
  };
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
