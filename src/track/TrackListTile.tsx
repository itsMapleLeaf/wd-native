import React from "react"
import { TouchableOpacity, View } from "react-native"
import AppText from "../ui/AppText"

export default function TrackListTile(props: {
  title: string
  userDisplayName: string
}) {
  return (
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
          {props.userDisplayName}
        </AppText>
        <AppText numberOfLines={2}>{props.title}</AppText>
      </View>
    </TouchableOpacity>
  )
}
