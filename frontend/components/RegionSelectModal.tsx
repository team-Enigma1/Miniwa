import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { PREFECTURES } from "../constants/prefectures";
import styles from "../styles/RegionModal.style";

type Props = {
    visible: boolean;
    value: string;
    onSave: (value: string) => void;
    onClose: () => void;
};

export default function RegionSelectModal({
    visible,
    value,
    onSave,
    onClose,
}: Props) {
const [tempValue, setTempValue] = useState(value);

    return (
        <Modal visible={visible} transparent animationType="slide">
        <View style={styles.overlay}>
            <View style={styles.modal}>
            <Text style={styles.title}>地域設定</Text>

            <FlatList
                data={PREFECTURES}
                keyExtractor={(item) => item}
                style={{ maxHeight: 300 }}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={[
                    styles.item,
                    item === tempValue && styles.selectedItem,
                    ]}
                    onPress={() => setTempValue(item)}
                >
                    <Text
                    style={[
                        styles.itemText,
                        item === tempValue && styles.selectedText,
                    ]}
                    >
                    {item}
                    </Text>
                </TouchableOpacity>
                )}
            />

            <View style={styles.buttons}>
                <TouchableOpacity onPress={onClose}>
                <Text style={styles.cancel}>キャンセル</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onSave(tempValue)}>
                <Text style={styles.save}>保存</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
    );
}
