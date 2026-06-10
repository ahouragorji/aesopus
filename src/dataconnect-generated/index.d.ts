import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Choice_Key {
  id: UUIDString;
  __typename?: 'Choice_Key';
}

export interface CreateStoryData {
  story_insert: Story_Key;
}

export interface CreateStoryVariables {
  title: string;
  content: string;
  wordListId: UUIDString;
}

export interface DeleteStoryData {
  story_delete?: Story_Key | null;
}

export interface DeleteStoryVariables {
  id: UUIDString;
}

export interface GetMyStoriesData {
  stories: ({
    id: UUIDString;
    title: string;
    content: string;
    completionStatus?: string | null;
  } & Story_Key)[];
}

export interface Story_Key {
  id: UUIDString;
  __typename?: 'Story_Key';
}

export interface UpdateStoryStatusData {
  story_update?: Story_Key | null;
}

export interface UpdateStoryStatusVariables {
  id: UUIDString;
  status: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WordItem_Key {
  id: UUIDString;
  __typename?: 'WordItem_Key';
}

export interface WordList_Key {
  id: UUIDString;
  __typename?: 'WordList_Key';
}

interface CreateStoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStoryVariables): MutationRef<CreateStoryData, CreateStoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateStoryVariables): MutationRef<CreateStoryData, CreateStoryVariables>;
  operationName: string;
}
export const createStoryRef: CreateStoryRef;

export function createStory(vars: CreateStoryVariables): MutationPromise<CreateStoryData, CreateStoryVariables>;
export function createStory(dc: DataConnect, vars: CreateStoryVariables): MutationPromise<CreateStoryData, CreateStoryVariables>;

interface GetMyStoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyStoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyStoriesData, undefined>;
  operationName: string;
}
export const getMyStoriesRef: GetMyStoriesRef;

export function getMyStories(options?: ExecuteQueryOptions): QueryPromise<GetMyStoriesData, undefined>;
export function getMyStories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyStoriesData, undefined>;

interface UpdateStoryStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStoryStatusVariables): MutationRef<UpdateStoryStatusData, UpdateStoryStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStoryStatusVariables): MutationRef<UpdateStoryStatusData, UpdateStoryStatusVariables>;
  operationName: string;
}
export const updateStoryStatusRef: UpdateStoryStatusRef;

export function updateStoryStatus(vars: UpdateStoryStatusVariables): MutationPromise<UpdateStoryStatusData, UpdateStoryStatusVariables>;
export function updateStoryStatus(dc: DataConnect, vars: UpdateStoryStatusVariables): MutationPromise<UpdateStoryStatusData, UpdateStoryStatusVariables>;

interface DeleteStoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStoryVariables): MutationRef<DeleteStoryData, DeleteStoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteStoryVariables): MutationRef<DeleteStoryData, DeleteStoryVariables>;
  operationName: string;
}
export const deleteStoryRef: DeleteStoryRef;

export function deleteStory(vars: DeleteStoryVariables): MutationPromise<DeleteStoryData, DeleteStoryVariables>;
export function deleteStory(dc: DataConnect, vars: DeleteStoryVariables): MutationPromise<DeleteStoryData, DeleteStoryVariables>;

