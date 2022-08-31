import React, { Component } from "react";
import { Animated } from "react-native";

type Item = string;

interface ToasterState {
    items: Item[];
    duration: number;
}

export default class Toaster extends Component<{}, ToasterState> {
    state: Readonly<ToasterState> = {
        items: [],
        duration: 5,
    };

    animatedValue: Animated.Value[] = [];

    componentDidMount(): void {
        this.loadMoreItems();
    }
    loadMoreItems = () => {
        const newItems: Item[] = [];

    }

}

