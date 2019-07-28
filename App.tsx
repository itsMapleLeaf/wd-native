import ApolloClient from "apollo-boost"
import React from "react"
import { ApolloProvider } from "react-apollo"
import App from "./src/App"
import { ThemeProvider } from "./src/ui/theme"

const client = new ApolloClient({
  uri: "https://wd-gql.herokuapp.com/",
})

export default function Root() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  )
}
