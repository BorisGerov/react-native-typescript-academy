import React from 'react';
import { User, UserStatus } from "./todo.model"
import { UserListener } from "./TodoApp";
import './TodoItem.css'

export interface UserItemProps {
    user: User;
    onUpdate: UserListener;
    onDelete: UserListener;
    onEdit: UserListener;
}

export const UserItem = ({ user,onUpdate, onDelete }: UserItemProps) => {
    function handleCompletion(event: React.MouseEvent) {
        onUpdate({ ...user, status: UserStatus.Completed })
    }
    function handleCancel(event: React.MouseEvent) {
        onUpdate({ ...user, status: UserStatus.Canceled })
    }
    return (
        <div className="UserItem">
            <span className="UserItem-text">
                <span className="UserItem-id">{user.id}</span>
                {user.firstName} {user.lastName} - {user.username} - {user.gender}
                <div className='outerDiv'>
                    <img src={user.url} alt="Profile picture" /> 
                </div>
                
            </span>
            <span className="UserItem-right">
                <span className="UserItem-status">{UserStatus[user.status]}</span>
                {user.status === UserStatus.Active ?
                    (<span className='Btn-first'><span className="UserItem-button fas fa-check-circle"
                        onClick={handleCompletion}></span> 
                    <span className="UserItem-button fas fa-times-circle danger"
                        onClick={handleCancel}></span></span> ):
                    <span className="UserItem-button fas fa-times-circle danger"
                        onClick={() => onDelete(user)}></span>
                }
                <span className="TodoItem-button fas fa-pen-to-square"
                    onClick={() => onEdit(user)}></span>
        </span>
        </div >
    )
}

export default UserItem;

function onEdit(todo: any): void {
    throw new Error('Function not implemented.');
}
