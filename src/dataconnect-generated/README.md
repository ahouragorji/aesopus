# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyStories*](#getmystories)
- [**Mutations**](#mutations)
  - [*CreateStory*](#createstory)
  - [*UpdateStoryStatus*](#updatestorystatus)
  - [*DeleteStory*](#deletestory)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyStories
You can execute the `GetMyStories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyStories(options?: ExecuteQueryOptions): QueryPromise<GetMyStoriesData, undefined>;

interface GetMyStoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyStoriesData, undefined>;
}
export const getMyStoriesRef: GetMyStoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyStories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyStoriesData, undefined>;

interface GetMyStoriesRef {
  ...
  (dc: DataConnect): QueryRef<GetMyStoriesData, undefined>;
}
export const getMyStoriesRef: GetMyStoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyStoriesRef:
```typescript
const name = getMyStoriesRef.operationName;
console.log(name);
```

### Variables
The `GetMyStories` query has no variables.
### Return Type
Recall that executing the `GetMyStories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyStoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyStoriesData {
  stories: ({
    id: UUIDString;
    title: string;
    content: string;
    completionStatus?: string | null;
  } & Story_Key)[];
}
```
### Using `GetMyStories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyStories } from '@dataconnect/generated';


// Call the `getMyStories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyStories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyStories(dataConnect);

console.log(data.stories);

// Or, you can use the `Promise` API.
getMyStories().then((response) => {
  const data = response.data;
  console.log(data.stories);
});
```

### Using `GetMyStories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyStoriesRef } from '@dataconnect/generated';


// Call the `getMyStoriesRef()` function to get a reference to the query.
const ref = getMyStoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyStoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.stories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.stories);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateStory
You can execute the `CreateStory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStory(vars: CreateStoryVariables): MutationPromise<CreateStoryData, CreateStoryVariables>;

interface CreateStoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStoryVariables): MutationRef<CreateStoryData, CreateStoryVariables>;
}
export const createStoryRef: CreateStoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStory(dc: DataConnect, vars: CreateStoryVariables): MutationPromise<CreateStoryData, CreateStoryVariables>;

interface CreateStoryRef {
  ...
  (dc: DataConnect, vars: CreateStoryVariables): MutationRef<CreateStoryData, CreateStoryVariables>;
}
export const createStoryRef: CreateStoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStoryRef:
```typescript
const name = createStoryRef.operationName;
console.log(name);
```

### Variables
The `CreateStory` mutation requires an argument of type `CreateStoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateStoryVariables {
  title: string;
  content: string;
  wordListId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateStory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStoryData {
  story_insert: Story_Key;
}
```
### Using `CreateStory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStory, CreateStoryVariables } from '@dataconnect/generated';

// The `CreateStory` mutation requires an argument of type `CreateStoryVariables`:
const createStoryVars: CreateStoryVariables = {
  title: ..., 
  content: ..., 
  wordListId: ..., 
};

// Call the `createStory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStory(createStoryVars);
// Variables can be defined inline as well.
const { data } = await createStory({ title: ..., content: ..., wordListId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStory(dataConnect, createStoryVars);

console.log(data.story_insert);

// Or, you can use the `Promise` API.
createStory(createStoryVars).then((response) => {
  const data = response.data;
  console.log(data.story_insert);
});
```

### Using `CreateStory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStoryRef, CreateStoryVariables } from '@dataconnect/generated';

// The `CreateStory` mutation requires an argument of type `CreateStoryVariables`:
const createStoryVars: CreateStoryVariables = {
  title: ..., 
  content: ..., 
  wordListId: ..., 
};

// Call the `createStoryRef()` function to get a reference to the mutation.
const ref = createStoryRef(createStoryVars);
// Variables can be defined inline as well.
const ref = createStoryRef({ title: ..., content: ..., wordListId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStoryRef(dataConnect, createStoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.story_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.story_insert);
});
```

## UpdateStoryStatus
You can execute the `UpdateStoryStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateStoryStatus(vars: UpdateStoryStatusVariables): MutationPromise<UpdateStoryStatusData, UpdateStoryStatusVariables>;

interface UpdateStoryStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStoryStatusVariables): MutationRef<UpdateStoryStatusData, UpdateStoryStatusVariables>;
}
export const updateStoryStatusRef: UpdateStoryStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStoryStatus(dc: DataConnect, vars: UpdateStoryStatusVariables): MutationPromise<UpdateStoryStatusData, UpdateStoryStatusVariables>;

interface UpdateStoryStatusRef {
  ...
  (dc: DataConnect, vars: UpdateStoryStatusVariables): MutationRef<UpdateStoryStatusData, UpdateStoryStatusVariables>;
}
export const updateStoryStatusRef: UpdateStoryStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStoryStatusRef:
```typescript
const name = updateStoryStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateStoryStatus` mutation requires an argument of type `UpdateStoryStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStoryStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateStoryStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStoryStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStoryStatusData {
  story_update?: Story_Key | null;
}
```
### Using `UpdateStoryStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStoryStatus, UpdateStoryStatusVariables } from '@dataconnect/generated';

// The `UpdateStoryStatus` mutation requires an argument of type `UpdateStoryStatusVariables`:
const updateStoryStatusVars: UpdateStoryStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateStoryStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStoryStatus(updateStoryStatusVars);
// Variables can be defined inline as well.
const { data } = await updateStoryStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStoryStatus(dataConnect, updateStoryStatusVars);

console.log(data.story_update);

// Or, you can use the `Promise` API.
updateStoryStatus(updateStoryStatusVars).then((response) => {
  const data = response.data;
  console.log(data.story_update);
});
```

### Using `UpdateStoryStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStoryStatusRef, UpdateStoryStatusVariables } from '@dataconnect/generated';

// The `UpdateStoryStatus` mutation requires an argument of type `UpdateStoryStatusVariables`:
const updateStoryStatusVars: UpdateStoryStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateStoryStatusRef()` function to get a reference to the mutation.
const ref = updateStoryStatusRef(updateStoryStatusVars);
// Variables can be defined inline as well.
const ref = updateStoryStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStoryStatusRef(dataConnect, updateStoryStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.story_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.story_update);
});
```

## DeleteStory
You can execute the `DeleteStory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteStory(vars: DeleteStoryVariables): MutationPromise<DeleteStoryData, DeleteStoryVariables>;

interface DeleteStoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStoryVariables): MutationRef<DeleteStoryData, DeleteStoryVariables>;
}
export const deleteStoryRef: DeleteStoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteStory(dc: DataConnect, vars: DeleteStoryVariables): MutationPromise<DeleteStoryData, DeleteStoryVariables>;

interface DeleteStoryRef {
  ...
  (dc: DataConnect, vars: DeleteStoryVariables): MutationRef<DeleteStoryData, DeleteStoryVariables>;
}
export const deleteStoryRef: DeleteStoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteStoryRef:
```typescript
const name = deleteStoryRef.operationName;
console.log(name);
```

### Variables
The `DeleteStory` mutation requires an argument of type `DeleteStoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteStoryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteStory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteStoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteStoryData {
  story_delete?: Story_Key | null;
}
```
### Using `DeleteStory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteStory, DeleteStoryVariables } from '@dataconnect/generated';

// The `DeleteStory` mutation requires an argument of type `DeleteStoryVariables`:
const deleteStoryVars: DeleteStoryVariables = {
  id: ..., 
};

// Call the `deleteStory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteStory(deleteStoryVars);
// Variables can be defined inline as well.
const { data } = await deleteStory({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteStory(dataConnect, deleteStoryVars);

console.log(data.story_delete);

// Or, you can use the `Promise` API.
deleteStory(deleteStoryVars).then((response) => {
  const data = response.data;
  console.log(data.story_delete);
});
```

### Using `DeleteStory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteStoryRef, DeleteStoryVariables } from '@dataconnect/generated';

// The `DeleteStory` mutation requires an argument of type `DeleteStoryVariables`:
const deleteStoryVars: DeleteStoryVariables = {
  id: ..., 
};

// Call the `deleteStoryRef()` function to get a reference to the mutation.
const ref = deleteStoryRef(deleteStoryVars);
// Variables can be defined inline as well.
const ref = deleteStoryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteStoryRef(dataConnect, deleteStoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.story_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.story_delete);
});
```

