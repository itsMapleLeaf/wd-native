import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import { UserListQuery, UserListQueryVariables } from "../generated/graphql"
import AppText from "../ui/AppText"

export default function UserList() {
  const { data } = useQuery<UserListQuery, UserListQueryVariables>(
    userListQuery,
  )
  return (
    <View>
      {data &&
        data.users &&
        data.users.rows.map((user) => (
          <TouchableOpacity key={user.id}>
            <AppText>{user.username}</AppText>
            <AppText>{user.displayName}</AppText>
          </TouchableOpacity>
        ))}
    </View>
  )
}

const userListQuery = gql`
  query userList {
    users(offset: 104) {
      rows {
        id
        username
        displayName
      }
    }
  }
`
