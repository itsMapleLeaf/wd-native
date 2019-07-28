import { gql } from "apollo-boost"
import produce from "immer"
import React from "react"
import { useQuery } from "react-apollo"
import { FlatList, TouchableOpacity, View } from "react-native"
import { TrackListQuery, TrackListQueryVariables } from "../generated/graphql"
import AppText from "../ui/AppText"

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

  const tracks = (data && data.tracks && data.tracks.rows) || []

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tracks}
        keyExtractor={(track) => String(track.id)}
        contentContainerStyle={{
          padding: 5,
        }}
        renderItem={({ item: track }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "rgb(13, 44, 76)",
              padding: 10,
              marginBottom: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                marginRight: 10,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }}
            />

            <View style={{ flex: 1 }}>
              <AppText numberOfLines={1} style={{ fontSize: 14, opacity: 0.7 }}>
                {track.user.displayName}
              </AppText>
              <AppText numberOfLines={2}>{track.title}</AppText>
            </View>
          </TouchableOpacity>
        )}
        refreshing={loading}
        onRefresh={() => refetch()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={1}
      />
    </View>
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
