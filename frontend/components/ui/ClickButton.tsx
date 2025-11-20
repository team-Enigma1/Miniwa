import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, } from "react-native";

    type Props = {
        label: string;
        IconComponent?: React.ReactNode; // MaterialIcons 
        onPress?: () => void;
        style?: ViewStyle;
    };

    export default function Click_Button({ label, IconComponent, onPress, style }: Props) {
    return (
        <TouchableOpacity style={[styles.settingRow, style]} onPress={onPress}>
        
        <View style={styles.leftWrap}>
            <View style={styles.icon}>
                {IconComponent}
            </View>
            <Text style={styles.settingRowLeft}>{label}</Text>
        </View>

        <Text style={styles.settingRowRight}>＞</Text>
        </TouchableOpacity>
    );
    }

    const styles = StyleSheet.create({
    settingRow: {
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderColor: "#ddd",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    leftWrap: {
        flexDirection: "row",
        alignItems: "center",
    },

    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },

    settingRowLeft: {
        fontSize: 16,
    },

    settingRowRight: {
        fontSize: 24,
        color: "#555",
        marginLeft: 10,
    },
}); 