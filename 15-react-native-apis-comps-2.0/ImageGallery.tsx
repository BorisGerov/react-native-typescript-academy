import React from "react";
import { StyleSheet, Text, View, Image, } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "7CA1B4",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default class ImageGallery extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Image
                    style={{width: 150, height: 150}}
                    resizeMode="contain"
                    source={{uri: 'https://images.theconversation.com/files/457052/original/file-20220408-15-pl446k.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip'}} 
                />
            </View>
        );
    }
}