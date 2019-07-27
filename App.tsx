import ApolloClient from "apollo-boost"
import React from "react"
import { ApolloProvider } from "react-apollo"
import App from "./src/App"
import { StyleProvider } from "./src/ui/style"

const client = new ApolloClient({
  uri: "https://wd-gql.herokuapp.com/",
})

export default function Root() {
  return (
    <ApolloProvider client={client}>
      <StyleProvider>
        <App />
      </StyleProvider>
    </ApolloProvider>
  )
}
