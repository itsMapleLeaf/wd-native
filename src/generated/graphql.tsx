export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Collection = {
  __typename?: "Collection"
  id: Scalars["Int"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  title: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  slug: Scalars["String"]
  type: Scalars["String"]
  duration: Scalars["Float"]
  user: User
  stats: CollectionStats
  byCurrentUser: UserCollectionActions
  artwork?: Maybe<ImageResource>
  tracks: TrackList
}

export type CollectionTracksArgs = {
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
}

export type CollectionList = {
  __typename?: "CollectionList"
  rows: Array<Collection>
  limit: Scalars["Int"]
  offset: Scalars["Int"]
}

export type CollectionStats = {
  __typename?: "CollectionStats"
  favorites: Scalars["Int"]
  comments: Scalars["Int"]
  plays: Scalars["Int"]
}

export type ImageMetadata = {
  __typename?: "ImageMetadata"
  width: Scalars["Int"]
  height: Scalars["Int"]
  format: Scalars["String"]
}

export type ImageResource = {
  __typename?: "ImageResource"
  key: Scalars["String"]
  sources: Array<ImageSource>
  status: Scalars["String"]
  metadata: ImageMetadata
}

export type ImageSource = {
  __typename?: "ImageSource"
  name: Scalars["String"]
  width: Scalars["Int"]
  height: Scalars["Int"]
  size: Scalars["Int"]
  format: Scalars["String"]
}

export type LoginResponse = {
  __typename?: "LoginResponse"
  success: Scalars["Boolean"]
}

export type Mutation = {
  __typename?: "Mutation"
  login: LoginResponse
}

export type MutationLoginArgs = {
  username: Scalars["String"]
  password: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  user: User
  users: UserList
  authUser?: Maybe<User>
  track: Track
  tracks: TrackList
  collection: Collection
  collections: CollectionList
}

export type QueryUserArgs = {
  id: Scalars["Int"]
}

export type QueryUsersArgs = {
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
}

export type QueryTrackArgs = {
  id: Scalars["Int"]
}

export type QueryTracksArgs = {
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
}

export type QueryCollectionArgs = {
  id: Scalars["Int"]
}

export type QueryCollectionsArgs = {
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
}

export type Track = {
  __typename?: "Track"
  id: Scalars["Int"]
  title: Scalars["String"]
  slug: Scalars["String"]
  type: Scalars["String"]
  visibility: Scalars["String"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  duration: Scalars["Float"]
  user: User
  description?: Maybe<Scalars["String"]>
}

export type TrackList = {
  __typename?: "TrackList"
  rows: Array<Track>
  limit: Scalars["Int"]
  offset: Scalars["Int"]
}

export type User = {
  __typename?: "User"
  id: Scalars["Int"]
  username: Scalars["String"]
  displayName: Scalars["String"]
  bio?: Maybe<Scalars["String"]>
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  country?: Maybe<Scalars["String"]>
  city?: Maybe<Scalars["String"]>
  avatar?: Maybe<ImageResource>
}

export type UserCollectionActions = {
  __typename?: "UserCollectionActions"
  favorited: Scalars["Boolean"]
  commented: Scalars["Boolean"]
  played: Scalars["Boolean"]
}

export type UserList = {
  __typename?: "UserList"
  rows: Array<User>
  limit: Scalars["Int"]
  offset: Scalars["Int"]
}
export type UserListQueryVariables = {}

export type UserListQuery = { __typename?: "Query" } & {
  users: { __typename?: "UserList" } & {
    rows: Array<
      { __typename?: "User" } & Pick<User, "id" | "username" | "displayName">
    >
  }
}
