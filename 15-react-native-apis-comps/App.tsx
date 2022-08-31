import React, { Component } from "react";
import { Pressable, View, Text } from "react-native";
import AppAnimation01 from "./AppAnimation01";
import AppAnimation02 from "./AppAnimation02";
import AppEasing from "./AppEasing";
import ProgressBar from "./AppProgressBar";
import AppProgressBar from "./AppProgressBar";
import Stagger from "./Stagger";

interface AppState {
    current : number;
}

export default class App extends Component<{}, AppState> {
    state: Readonly<AppState> = {
        current: 0,
    };

    handlePress = () => {
        if(this.state.current < 100){
        this.setState({current: this.state.current + 25})
        }
    }

    render(){
        return(
     <View> 
        <Pressable onPress={this.handlePress}>
            <Text>Click here !</Text> 
        </Pressable>
    <ProgressBar min={0} max={100} current={this.state.current}/>
    </View>
        )
    }
}
