import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import AppText from "../ui/AppText"

export default function UserList() {
  const { data } = useQuery<UserListQuery>(userListQuery)
  return (
    <View>
      {data.users &&
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
  {
    users(offset: 104) {
      rows {
        id
        username
        displayName
      }
    }
  }
`

type UserListQuery = {
  users: {
    rows: {
      id: number
      username: string
      displayName: string
    }[]
  }
}
