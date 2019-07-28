import React from "react"
import { KeyboardAvoidingView, View } from "react-native"
import TrackList from "./track/TrackList"
import { useStyles } from "./ui/style"

export default function App() {
  const styles = useStyles()
  return (
    <KeyboardAvoidingView
      style={[styles.background, styles.flex1]}
      behavior="padding"
    >
      <View style={styles.statusBarHeight} />
      <TrackList />
    </KeyboardAvoidingView>
  )
}
