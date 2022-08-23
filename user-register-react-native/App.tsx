import React, { Component } from "react";
import { FlatList, Image, Text, TextInput, View, StyleSheet, SectionList } from "react-native";
import { Cat } from "./cat-model";
import CatComponent, { CatComponentProps } from "./CatComponent";
import { FEMALE_CATS, MALE_CATS } from "./sample-cats";
import MOCK_USERS from "./src/mock-todos";
import { UsersAPI } from "./src/rest-api-client";
import { Optional } from "./src/shared-types";
import { User, UserStatus } from "./src/todo.model";
import UserFilter from "./src/TodoFilter";
import UserInput from "./src/TodoInput";
import UserList from "./src/TodoList";

export type FilterType = UserStatus | undefined;

interface UserAppState {
  users: User[];
  editedUser: Optional<User>;
  filter: FilterType;
  errors: string | undefined;
}



export interface UserListener {
  (user: User): void;
}

export interface FilterChangeListener {
  (filter: FilterType): void;

}
class UserApp extends Component<{}, UserAppState> {
    state: Readonly<UserAppState> = {
      errors: undefined,
      editedUser: undefined,
      users: MOCK_USERS,
      filter: undefined
    }
    constructor(props: {}) {
      super(props)
      this.handleUpdateUser = this.handleUpdateUser.bind(this);
    }
    async componentDidMount() {
      try {
          const allUserss = await UsersAPI.findAll();
          this.setState(({users}) => ({users: users.concat(allUserss), errors: undefined}));
      } catch(err) {
        this.setState({errors: err as string})
          // this.setState({errors: (err as any).toString()})
      }
    }
  
    handleUpdateUser(user: User) {
      this.setState(({ users }) => ({
        users: users.map(td => td.id === user.id ? user : td)
      }))
    }
  
    handleDeleteUser = async (user: User) => {
      try {
        await UsersAPI.deleteById(user.id);
        this.setState(({users}) => ({
          users: users.filter(td => td.id !== user.id),
          errors: undefined
        }))
      } catch(err) {
        this.setState({errors: err as string})
      }
  
      // this.setState(({ users }) => ({
      //   users: users.filter(td => td.id !== user.id)
      // }))
    }
  
    handleCreateUser = async (user: User) => {
      try {
        if(user.id) {
          const updated = await UsersAPI.update(user);
          this.setState(({ users }) => ({
            users: users.map(td => td.id === updated.id ? updated : td),
            errors: undefined,
            editedUser: undefined
          }))
        } else {
          const created = await UsersAPI.create(user);
          this.setState(({ users }) => ({
            users: users.concat(created),
            errors: undefined
          }))
        }
      } catch(err) {
        this.setState({errors: err as string})
      }
  
      // this.setState(({ users }) => ({
      //   users: users.concat(user)
      // }))
    }
    handlefilterChange = (status: FilterType) => {
      this.setState({filter: status})
    }
    handleEditUser = (user: User) => {
      this.setState({editedUser: user});
    }
    render() {
        return (
     <View style={styles.header}>
        <View>
          <Text>Register</Text>
          <UserInput key={this.state.editedUser?.id} user={this.state.editedUser} onCreateTodo={this.handleCreateUser} />
       <UserFilter filter={this.state.filter} onFilterChange={this.handlefilterChange} />
             <UserList
                users={this.state.users}
                filter={this.state.filter}
                onUpdate={this.handleUpdateUser}
                onDelete={this.handleDeleteUser} 
                onEdit={this.handleEditUser}
          />
        </View>
      </View>
        );
    }
}

export default UserApp;

const styles = StyleSheet.create({
    header : {
        fontSize: 36,
        padding: 20,
        alignSelf: 'center',
    },
    input : {
        fontSize: 50,
        padding: 20,
        alignSelf: 'center',
        display: "flex",
    },
});