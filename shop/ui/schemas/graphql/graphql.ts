/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: any; output: any; }
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: { input: any; output: any; }
};

/** All input for the create `_PrismaMigration` mutation. */
export type CreatePrismaMigrationInput = {
  /** The `_PrismaMigration` to be created by this mutation. */
  _prismaMigration: _PrismaMigrationInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `_PrismaMigration` mutation. */
export type CreatePrismaMigrationPayload = {
  __typename?: 'CreatePrismaMigrationPayload';
  /** The `_PrismaMigration` that was created by this mutation. */
  _prismaMigration?: Maybe<_PrismaMigration>;
  /** An edge for our `_PrismaMigration`. May be used by Relay 1. */
  _prismaMigrationEdge?: Maybe<_PrismaMigrationsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `_PrismaMigration` mutation. */
export type CreatePrismaMigrationPayload_PrismaMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<_PrismaMigrationsOrderBy>>;
};

/** All input for the create `StockItem` mutation. */
export type CreateStockItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `StockItem` to be created by this mutation. */
  stockItem: StockItemInput;
};

/** The output of our create `StockItem` mutation. */
export type CreateStockItemPayload = {
  __typename?: 'CreateStockItemPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StockItem` that was created by this mutation. */
  stockItem?: Maybe<StockItem>;
  /** An edge for our `StockItem`. May be used by Relay 1. */
  stockItemEdge?: Maybe<StockItemsEdge>;
};


/** The output of our create `StockItem` mutation. */
export type CreateStockItemPayloadStockItemEdgeArgs = {
  orderBy?: InputMaybe<Array<StockItemsOrderBy>>;
};

/** All input for the `deletePrismaMigrationByNodeId` mutation. */
export type DeletePrismaMigrationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `_PrismaMigration` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePrismaMigration` mutation. */
export type DeletePrismaMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

/** The output of our delete `_PrismaMigration` mutation. */
export type DeletePrismaMigrationPayload = {
  __typename?: 'DeletePrismaMigrationPayload';
  /** The `_PrismaMigration` that was deleted by this mutation. */
  _prismaMigration?: Maybe<_PrismaMigration>;
  /** An edge for our `_PrismaMigration`. May be used by Relay 1. */
  _prismaMigrationEdge?: Maybe<_PrismaMigrationsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPrismaMigrationNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `_PrismaMigration` mutation. */
export type DeletePrismaMigrationPayload_PrismaMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<_PrismaMigrationsOrderBy>>;
};

/** All input for the `deleteStockItemByNodeId` mutation. */
export type DeleteStockItemByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `StockItem` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteStockItem` mutation. */
export type DeleteStockItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

/** The output of our delete `StockItem` mutation. */
export type DeleteStockItemPayload = {
  __typename?: 'DeleteStockItemPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedStockItemNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StockItem` that was deleted by this mutation. */
  stockItem?: Maybe<StockItem>;
  /** An edge for our `StockItem`. May be used by Relay 1. */
  stockItemEdge?: Maybe<StockItemsEdge>;
};


/** The output of our delete `StockItem` mutation. */
export type DeleteStockItemPayloadStockItemEdgeArgs = {
  orderBy?: InputMaybe<Array<StockItemsOrderBy>>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `_PrismaMigration`. */
  createPrismaMigration?: Maybe<CreatePrismaMigrationPayload>;
  /** Creates a single `StockItem`. */
  createStockItem?: Maybe<CreateStockItemPayload>;
  /** Deletes a single `_PrismaMigration` using a unique key. */
  deletePrismaMigration?: Maybe<DeletePrismaMigrationPayload>;
  /** Deletes a single `_PrismaMigration` using its globally unique id. */
  deletePrismaMigrationByNodeId?: Maybe<DeletePrismaMigrationPayload>;
  /** Deletes a single `StockItem` using a unique key. */
  deleteStockItem?: Maybe<DeleteStockItemPayload>;
  /** Deletes a single `StockItem` using its globally unique id. */
  deleteStockItemByNodeId?: Maybe<DeleteStockItemPayload>;
  /** Updates a single `_PrismaMigration` using a unique key and a patch. */
  updatePrismaMigration?: Maybe<UpdatePrismaMigrationPayload>;
  /** Updates a single `_PrismaMigration` using its globally unique id and a patch. */
  updatePrismaMigrationByNodeId?: Maybe<UpdatePrismaMigrationPayload>;
  /** Updates a single `StockItem` using a unique key and a patch. */
  updateStockItem?: Maybe<UpdateStockItemPayload>;
  /** Updates a single `StockItem` using its globally unique id and a patch. */
  updateStockItemByNodeId?: Maybe<UpdateStockItemPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePrismaMigrationArgs = {
  input: CreatePrismaMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateStockItemArgs = {
  input: CreateStockItemInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePrismaMigrationArgs = {
  input: DeletePrismaMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePrismaMigrationByNodeIdArgs = {
  input: DeletePrismaMigrationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStockItemArgs = {
  input: DeleteStockItemInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStockItemByNodeIdArgs = {
  input: DeleteStockItemByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePrismaMigrationArgs = {
  input: UpdatePrismaMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePrismaMigrationByNodeIdArgs = {
  input: UpdatePrismaMigrationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStockItemArgs = {
  input: UpdateStockItemInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStockItemByNodeIdArgs = {
  input: UpdateStockItemByNodeIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  _prismaMigration?: Maybe<_PrismaMigration>;
  /** Reads a single `_PrismaMigration` using its globally unique `ID`. */
  _prismaMigrationByNodeId?: Maybe<_PrismaMigration>;
  /** Reads and enables pagination through a set of `_PrismaMigration`. */
  _prismaMigrations?: Maybe<_PrismaMigrationsConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  stockItem?: Maybe<StockItem>;
  /** Reads a single `StockItem` using its globally unique `ID`. */
  stockItemByNodeId?: Maybe<StockItem>;
  /** Reads and enables pagination through a set of `StockItem`. */
  stockItems?: Maybe<StockItemsConnection>;
};


/** The root query type which gives access points into the data universe. */
export type Query_PrismaMigrationArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type Query_PrismaMigrationByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type Query_PrismaMigrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<_PrismaMigrationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<_PrismaMigrationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStockItemArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStockItemByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStockItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<StockItemCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StockItemsOrderBy>>;
};

export type StockItem = Node & {
  __typename?: 'StockItem';
  accountId: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  updatedAt: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `StockItem` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type StockItemCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An input for mutations affecting `StockItem` */
export type StockItemInput = {
  accountId: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  updatedAt: Scalars['Datetime']['input'];
};

/** Represents an update to a `StockItem`. Fields that are set will be updated. */
export type StockItemPatch = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `StockItem` values. */
export type StockItemsConnection = {
  __typename?: 'StockItemsConnection';
  /** A list of edges which contains the `StockItem` and cursor to aid in pagination. */
  edges: Array<StockItemsEdge>;
  /** A list of `StockItem` objects. */
  nodes: Array<StockItem>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `StockItem` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `StockItem` edge in the connection. */
export type StockItemsEdge = {
  __typename?: 'StockItemsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `StockItem` at the end of the edge. */
  node: StockItem;
};

/** Methods to use when ordering `StockItem`. */
export enum StockItemsOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** All input for the `updatePrismaMigrationByNodeId` mutation. */
export type UpdatePrismaMigrationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `_PrismaMigration` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `_PrismaMigration` being updated. */
  patch: _PrismaMigrationPatch;
};

/** All input for the `updatePrismaMigration` mutation. */
export type UpdatePrismaMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `_PrismaMigration` being updated. */
  patch: _PrismaMigrationPatch;
};

/** The output of our update `_PrismaMigration` mutation. */
export type UpdatePrismaMigrationPayload = {
  __typename?: 'UpdatePrismaMigrationPayload';
  /** The `_PrismaMigration` that was updated by this mutation. */
  _prismaMigration?: Maybe<_PrismaMigration>;
  /** An edge for our `_PrismaMigration`. May be used by Relay 1. */
  _prismaMigrationEdge?: Maybe<_PrismaMigrationsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `_PrismaMigration` mutation. */
export type UpdatePrismaMigrationPayload_PrismaMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<_PrismaMigrationsOrderBy>>;
};

/** All input for the `updateStockItemByNodeId` mutation. */
export type UpdateStockItemByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `StockItem` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `StockItem` being updated. */
  patch: StockItemPatch;
};

/** All input for the `updateStockItem` mutation. */
export type UpdateStockItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `StockItem` being updated. */
  patch: StockItemPatch;
};

/** The output of our update `StockItem` mutation. */
export type UpdateStockItemPayload = {
  __typename?: 'UpdateStockItemPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StockItem` that was updated by this mutation. */
  stockItem?: Maybe<StockItem>;
  /** An edge for our `StockItem`. May be used by Relay 1. */
  stockItemEdge?: Maybe<StockItemsEdge>;
};


/** The output of our update `StockItem` mutation. */
export type UpdateStockItemPayloadStockItemEdgeArgs = {
  orderBy?: InputMaybe<Array<StockItemsOrderBy>>;
};

export type _PrismaMigration = Node & {
  __typename?: '_PrismaMigration';
  appliedStepsCount: Scalars['Int']['output'];
  checksum: Scalars['String']['output'];
  finishedAt?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['String']['output'];
  logs?: Maybe<Scalars['String']['output']>;
  migrationName: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  rolledBackAt?: Maybe<Scalars['Datetime']['output']>;
  startedAt: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `_PrismaMigration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type _PrismaMigrationCondition = {
  /** Checks for equality with the object’s `appliedStepsCount` field. */
  appliedStepsCount?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `checksum` field. */
  checksum?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `finishedAt` field. */
  finishedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `logs` field. */
  logs?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `migrationName` field. */
  migrationName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rolledBackAt` field. */
  rolledBackAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `startedAt` field. */
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An input for mutations affecting `_PrismaMigration` */
export type _PrismaMigrationInput = {
  appliedStepsCount?: InputMaybe<Scalars['Int']['input']>;
  checksum: Scalars['String']['input'];
  finishedAt?: InputMaybe<Scalars['Datetime']['input']>;
  id: Scalars['String']['input'];
  logs?: InputMaybe<Scalars['String']['input']>;
  migrationName: Scalars['String']['input'];
  rolledBackAt?: InputMaybe<Scalars['Datetime']['input']>;
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Represents an update to a `_PrismaMigration`. Fields that are set will be updated. */
export type _PrismaMigrationPatch = {
  appliedStepsCount?: InputMaybe<Scalars['Int']['input']>;
  checksum?: InputMaybe<Scalars['String']['input']>;
  finishedAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  logs?: InputMaybe<Scalars['String']['input']>;
  migrationName?: InputMaybe<Scalars['String']['input']>;
  rolledBackAt?: InputMaybe<Scalars['Datetime']['input']>;
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `_PrismaMigration` values. */
export type _PrismaMigrationsConnection = {
  __typename?: '_PrismaMigrationsConnection';
  /** A list of edges which contains the `_PrismaMigration` and cursor to aid in pagination. */
  edges: Array<_PrismaMigrationsEdge>;
  /** A list of `_PrismaMigration` objects. */
  nodes: Array<_PrismaMigration>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `_PrismaMigration` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `_PrismaMigration` edge in the connection. */
export type _PrismaMigrationsEdge = {
  __typename?: '_PrismaMigrationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `_PrismaMigration` at the end of the edge. */
  node: _PrismaMigration;
};

/** Methods to use when ordering `_PrismaMigration`. */
export enum _PrismaMigrationsOrderBy {
  AppliedStepsCountAsc = 'APPLIED_STEPS_COUNT_ASC',
  AppliedStepsCountDesc = 'APPLIED_STEPS_COUNT_DESC',
  ChecksumAsc = 'CHECKSUM_ASC',
  ChecksumDesc = 'CHECKSUM_DESC',
  FinishedAtAsc = 'FINISHED_AT_ASC',
  FinishedAtDesc = 'FINISHED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LogsAsc = 'LOGS_ASC',
  LogsDesc = 'LOGS_DESC',
  MigrationNameAsc = 'MIGRATION_NAME_ASC',
  MigrationNameDesc = 'MIGRATION_NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RolledBackAtAsc = 'ROLLED_BACK_AT_ASC',
  RolledBackAtDesc = 'ROLLED_BACK_AT_DESC',
  StartedAtAsc = 'STARTED_AT_ASC',
  StartedAtDesc = 'STARTED_AT_DESC'
}

export type GetStockItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStockItemsQuery = { __typename?: 'Query', stockItems?: { __typename?: 'StockItemsConnection', nodes: Array<{ __typename?: 'StockItem', id: string, name: string, accountId: string, createdAt: any, updatedAt: any }> } | null };


export const GetStockItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStockItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetStockItemsQuery, GetStockItemsQueryVariables>;