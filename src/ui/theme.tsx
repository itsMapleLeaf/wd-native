import React, { createContext, PropsWithChildren, useContext } from "react"
import { StatusBar, StyleSheet } from "react-native"

function createBaseTheme() {
  const spacing = {
    none: 0,
    hair: 1,
    thin: 2,
    xxsmall: 4,
    xsmall: 6,
    small: 12,
    medium: 24,
    large: 32,
  }

  const colors = {
    base: "rgb(13, 44, 76)",
    baseBackground: "rgb(9, 31, 53)",
    text: "rgb(225, 225, 240)",
  }

  const styles = StyleSheet.create({
    backgroundFill: {
      backgroundColor: colors.baseBackground,
    },
    baseFill: {
      backgroundColor: colors.base,
    },
    text: {
      fontSize: 15,
      fontFamily: "Roboto",
      color: colors.text,
    },
    flex1: {
      flex: 1,
    },
    statusBarHeight: {
      height: StatusBar.currentHeight,
    },
  })

  return { spacing, colors, styles }
}

const baseTheme = createBaseTheme()

const ThemeContext = createContext<typeof baseTheme | undefined>(undefined)

export function ThemeProvider(props: PropsWithChildren<{}>) {
  return (
    <ThemeContext.Provider value={baseTheme}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const theme = useContext(ThemeContext)
  if (!theme) {
    throw new Error("useStyles() must be used inside of StylesProvider")
  }
  return theme
}
