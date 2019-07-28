import React, { PropsWithChildren } from "react"
import { Text, TextProps } from "react-native"
import { useTheme } from "./theme"

export default function AppText(props: PropsWithChildren<TextProps>) {
  const { styles } = useTheme()
  return <Text {...props} style={[styles.text, props.style]} />
}
