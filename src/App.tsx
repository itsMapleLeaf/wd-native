import React from "react"
import { View } from "react-native"
import { useStyles } from "./ui/style"
import UserList from "./user/UserList"

export default function App() {
  const styles = useStyles()
  return (
    <View style={styles.background}>
      <UserList />
    </View>
  )
}
