import React from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import styles from "../styles/ProfileEditModal.styles";

    type Props = {
    visible: boolean;
    name: string;
    bio: string;
    onChangeName: (text: string) => void;
    onChangeBio: (text: string) => void;
    onClose: () => void;
    onSave: () => void;
    };

export default function ProfileEditModal({visible,name,bio,onChangeName,onChangeBio,onClose,onSave,}: Props) {
    return (
        <Modal visible={visible} transparent animationType="slide">
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
            <Text style={styles.title}>プロフィール編集</Text>

            <TextInput
                style={styles.inputName}
                value={name}
                onChangeText={onChangeName}
                placeholder="名前"
            />

            <TextInput
                style={styles.inputBio}
                value={bio}
                onChangeText={onChangeBio}
                placeholder="自己紹介"
                multiline
            />

            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={onClose}>
                <Text style={styles.cancelText}>キャンセル</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onSave}>
                <Text style={styles.saveText}>保存</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
    );
}
