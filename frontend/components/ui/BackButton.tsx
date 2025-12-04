import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


export default function BackIcon() {
    const router = useRouter();

    return (
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
        <MaterialIcons name="west" size={20} color="black" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
});
