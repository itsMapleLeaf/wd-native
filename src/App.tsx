import React from "react"
import { KeyboardAvoidingView, View } from "react-native"
import TrackList from "./track/TrackList"
import { useTheme } from "./ui/theme"

export default function App() {
  const { styles } = useTheme()
  return (
    <KeyboardAvoidingView
      style={[styles.backgroundFill, styles.flex1]}
      behavior="padding"
    >
      <View style={styles.statusBarHeight} />
      <TrackList />
    </KeyboardAvoidingView>
  )
}
