import React from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import AppAnimation01 from "./AppAnimation01";
import AppAnimation02 from "./AppAnimation02";
import AppEasing from "./AppEasing";
import App from "./AppLayoutAnimation";
import Draggable from "./Draggable";
import GestureResponder from "./GestureResponder";
import ImageGallery from "./ImageGallery";
import LightBox, { SAMPLE_IMAGES } from "./LightBox";
import ScrollViewAnimatedHeader from "./ScrollViewAnimatedHeader";
import Stagger from "./Stagger";

export default () =>
(
    // <SafeAreaView style={styles.container}>
    //     <LightBox images={SAMPLE_IMAGES} height={400} width={800}/>
    // </SafeAreaView>
    // <Draggable />
    // <ImageGallery />
    <App />
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})