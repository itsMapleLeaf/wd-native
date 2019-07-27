import React from "react"
import { View } from "react-native"
import TrackList from "./track/TrackList"
import { useStyles } from "./ui/style"

export default function App() {
  const styles = useStyles()
  return (
    <View style={[styles.background, styles.flex1]}>
      <TrackList />
    </View>
  )
}
