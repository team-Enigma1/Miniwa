import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, } from "react-native";

    type Props = {
        label: string;
        IconComponent?: React.ReactNode; // MaterialIcons 
        style?: ViewStyle;
        data: number;
    };

    export default function Click_Button({ label, IconComponent, style, data }: Props) {
    return (
        <TouchableOpacity style={[styles.settingRow, style]} >
        
        <View style={styles.leftWrap}>
            <View style={styles.icon}>
                {IconComponent}
            </View>
            <Text style={styles.settingRowLeft}>{label}</Text>
        </View>

        <Text style={styles.settingRowRight}>{data}</Text>
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
        marginBottom: 5,
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
        fontSize: 18,
        color: "#666",
        marginLeft: 10,
    },
}); 