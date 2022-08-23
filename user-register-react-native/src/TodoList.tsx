import { toUnicode } from "punycode";
import { useMemo } from "react";
import { User, UserStatus } from "./todo.model";
import { FilterType, UserListener } from "./TodoApp";
import UserItem from "./TodoItem";
import './TodoList.css'

interface Props{
    users: User[];
    filter: FilterType;
    onUpdate: UserListener;
    onDelete: UserListener;
    onEdit: UserListener;
}

export default function UserList({users: users, filter, ...rest}: Props) {
    const visibleUsers = (users: User[], filter: FilterType) => users.filter(user => !filter ? true : user.status === filter);
    const memoizedVisibleUsers = useMemo(() => visibleUsers(users, filter), [users, filter]);
    return (<div className="UserList">
        {
        memoizedVisibleUsers.map(user =>
            <UserItem user={user} key={user.id} {...rest} />)
        }
    </div>)
}