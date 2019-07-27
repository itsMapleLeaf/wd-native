import React, { PropsWithChildren } from "react"
import { Text, TextProps } from "react-native"
import { useStyles } from "./style"

export default function AppText(props: PropsWithChildren<TextProps>) {
  const styles = useStyles()
  return <Text {...props} style={[styles.text, props.style]} />
}
