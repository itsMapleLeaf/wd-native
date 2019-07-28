import { gql } from "apollo-boost"
import React from "react"
import { useQuery } from "react-apollo"
import { FlatList, TouchableOpacity, View } from "react-native"
import { TrackListQuery, TrackListQueryVariables } from "../generated/graphql"
import AppText from "../ui/AppText"

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

    fetchMore({
      query: trackListQuery,
      variables: {
        limit: data.tracks.limit,
        offset: data.tracks.offset + data.tracks.limit,
      },
      updateQuery(prevResult, { fetchMoreResult }) {
        return {
          ...prevResult,
          tracks: {
            ...prevResult.tracks,
            offset: fetchMoreResult!.tracks.offset,
            rows: [...prevResult.tracks.rows, ...fetchMoreResult!.tracks.rows],
          },
        }
      },
    })
  }

  const tracks = (data && data.tracks && data.tracks.rows) || []

  return (
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
              borderRadius: 30,
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
  )

  // return <AppText>{JSON.stringify(data, null, 2)}</AppText>
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
