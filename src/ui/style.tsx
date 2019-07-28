import React, { createContext, PropsWithChildren, useContext } from "react"
import { StyleSheet } from "react-native"

// right now we only have one style sheet,
// but this sets us up to add in theming later if we want it
// also makes it easier to share specific styles throughout the app,
// especially helper styles
const defaultStyles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(9, 31, 53)",
  },
  text: {
    fontSize: 15,
    fontFamily: "Roboto",
    color: `rgb(225, 225, 240)`,
  },
  flex1: {
    flex: 1,
  },
})

const StyleContext = createContext<typeof defaultStyles | undefined>(undefined)

export function StyleProvider(props: PropsWithChildren<{}>) {
  return (
    <StyleContext.Provider value={defaultStyles}>
      {props.children}
    </StyleContext.Provider>
  )
}

export function useStyles() {
  const styles = useContext(StyleContext)
  if (!styles) {
    throw new Error("useStyles() must be used inside of StylesProvider")
  }
  return styles
}
