import React from "react"
import { KeyboardAvoidingView, StatusBar, View } from "react-native"
import TrackList from "./track/TrackList"
import { useStyles } from "./ui/style"

function StatusBarSpacer() {
  return <View style={{ height: StatusBar.currentHeight }} />
}

export default function App() {
  const styles = useStyles()
  return (
    <KeyboardAvoidingView
      style={[styles.background, styles.flex1]}
      behavior="padding"
    >
      <StatusBarSpacer />
      <TrackList />
    </KeyboardAvoidingView>
  )
}
