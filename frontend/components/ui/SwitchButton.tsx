import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, Switch } from "react-native";

type Props = {
    label: string;
    IconComponent?: React.ReactNode;
    onPress?: () => void;
    style?: ViewStyle;
};

export default function Switch_Button({ label, IconComponent, onPress, style }: Props) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((prev) => !prev);

    return (
        <TouchableOpacity style={[styles.settingRow, style]} onPress={onPress} activeOpacity={0.8}>
        
            <View style={styles.leftWrap}>
                <View style={styles.icon}>
                    {IconComponent}
                </View>
                <Text style={styles.settingRowLeft}>{label}</Text>
            </View>

            <Switch
                value={isEnabled}
                onValueChange={toggleSwitch}
                thumbColor={isEnabled ? "#fff" : "#fff"}
                trackColor={{ false: "#666", true: "#2ECC71" }}
            />

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
});
