import { User, UserStatus } from "./todo.model";
import { FilterType, UserListener } from "./TodoApp";
import UserItem from "./TodoItem";
import './TodoList.css'

interface Props{
    users: User[];
    filter: FilterType;
    onUpdate: UserListener;
    onDelete: UserListener;
}

export default function UserList({users: users, filter, ...rest}: Props) {
    return (<div className="UserList">
        {
        users.filter(user => !filter ? true: user.status === filter).map(user =>
            (<UserItem user={user} key={user.id} {...rest} />))
        }
    </div>)
}