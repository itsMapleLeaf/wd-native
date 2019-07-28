import { gql } from "apollo-boost"
import idx from "idx"
import produce from "immer"
import React from "react"
import { useQuery } from "react-apollo"
import { FlatList } from "react-native"
import getStringId from "../common/getStringId"
import { TrackListQuery, TrackListQueryVariables } from "../generated/graphql"
import TrackListTile from "./TrackListTile"

type UpdateQueryOptions<Q, V = {}> = {
  fetchMoreResult?: Q
  variables?: V
}

type UpdateQueryFn<Q, V = {}> = (
  prevResult: Q,
  options: UpdateQueryOptions<Q, V>,
) => Q

export default function TrackList() {
  const { data, loading, refetch, fetchMore } = useQuery<
    TrackListQuery,
    TrackListQueryVariables
  >(trackListQuery, {
    variables: { limit: 20 },
    notifyOnNetworkStatusChange: true,
  })

  const handleEndReached = () => {
    if (loading || !data) return

    const updateQuery = produce<UpdateQueryFn<TrackListQuery>>(
      (state, { fetchMoreResult }) => {
        if (!fetchMoreResult) return state
        state.tracks.offset = fetchMoreResult.tracks.offset
        state.tracks.rows.push(...fetchMoreResult.tracks.rows)
        return state
      },
    )

    fetchMore({
      query: trackListQuery,
      variables: {
        limit: data.tracks.limit,
        offset: data.tracks.offset + data.tracks.limit,
      },
      updateQuery,
    })
  }

  const tracks = idx(data, (_) => _.tracks.rows) || []

  return (
    <FlatList
      data={tracks}
      keyExtractor={getStringId}
      contentContainerStyle={{
        padding: 5,
      }}
      renderItem={({ item: track }) => (
        <TrackListTile
          title={track.title}
          userDisplayName={track.user.displayName}
        />
      )}
      refreshing={loading}
      onRefresh={() => refetch()}
      onEndReached={handleEndReached}
      onEndReachedThreshold={1}
    />
  )
}

const trackListQuery = gql`
  query trackList($offset: Int, $limit: Int) {
    tracks(limit: $limit, offset: $offset) {
      rows {
        id
        title
        user {
          displayName
        }
        createdAt
      }
      offset
      limit
    }
  }
`
