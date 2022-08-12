import { stat } from 'fs';
import React, { Component } from 'react';
import { string } from 'yargs';
import { User, UserStatus } from './todo.model';
import { UserListener } from './TodoApp';
import './TodoInput.css';

interface UserInputProps {
    onCreateTodo: UserListener
}

interface UserInputState {
    
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    comfirmPassword: string;
    gender: string;
    status: UserStatus.Active;
    url: string
}

class UserInput extends Component<UserInputProps, UserInputState> {
    state: Readonly<UserInputState> = {
        
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        comfirmPassword: '',
        gender: '',
        status: UserStatus.Active,
        url: ''
    }
    handleUserSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onCreateTodo(new User(this.state.firstName, this.state.lastName, this.state.username, this.state.password, this.state.comfirmPassword, this.state.gender, this.state.status, this.state.url));
        this.setState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        comfirmPassword: '',
        gender: '',
        status: UserStatus.Active,
        url: ''
    })
    }

    handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name as keyof UserInputState & string;
        const stateUpdate = {[fieldName]: event.target.value} as unknown as UserInputState;
        this.setState(stateUpdate);
    }

    handleUserReset = (event: React.MouseEvent) => {
        event.preventDefault();
        this.setState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        comfirmPassword: '',
        gender: '',
        status: UserStatus.Active,
        url: ''
    })
    }

    render() {
        return (
            <form className="UserInput-form" onSubmit={this.handleUserSubmit}>
                <label htmlFor="UserInput-user-text">First Name</label>
                <input type="text" id="UserInput-user-text-firstName" name="firstName" value={this.state.firstName}
                    onChange={this.handleTextChanged} />
                <label htmlFor="UserInput-user-text">Last Name</label>
                <input type="text" id="TodoInput-user-text-lastName" name="lastName" value={this.state.lastName}
                    onChange={this.handleTextChanged} />
                <label htmlFor="UserInput-user-text">Username</label>
                <input type="text" id="TodoInput-user-text-username" name="username" value={this.state.username}
                    onChange={this.handleTextChanged} />
                <label htmlFor="UserInput-user-text">Password</label>
                <input type="password" id="TodoInput-user-text-password" name="password" value={this.state.password}
                    onChange={this.handleTextChanged} />
                <label htmlFor="UserInput-user-text">Comfirm Password</label>
                <input type="password" id="TodoInput-user-text-comfirmPassword" name="comfirmPassword" value={this.state.comfirmPassword}
                    onChange={this.handleTextChanged} />
                <label htmlFor="UserInput-user-text">Add a Picture</label>
                <input type="Url" id="TodoInput-user-text-url" name="url" value={this.state.url}
                    onChange={this.handleTextChanged} placeholder="https://example.jpg/.png/.jpeg"/>
                <label htmlFor="UserInput-user-text">Gender</label>
                <select className='UserFilter'>
                    <option value="0">Gender</option>
                    <option value={UserStatus.Active}>Male</option>
                    <option value={UserStatus.Suspended}>Female</option>
                    <option value={UserStatus.Deactivated}>Other</option>
                </select>
                
                <button className='button button5' type="submit">Submit User</button>
                <button className='button button3' type="reset" onClick={this.handleUserReset}>Reset</button>
            </form>
        );
    }
}

export default UserInput;