import { StyleSheet } from "react-native";

export default StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContainer: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
    },

    inputName: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        fontSize: 16,
        marginBottom: 12,
    },

    inputBio: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        height: 100,
        textAlignVertical: "top",
        fontSize: 14,
        marginBottom: 20,
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    cancelText: {
        color: "#666",
        fontSize: 16,
    },

    saveText: {
        color: "#35C46B",
        fontSize: 16,
        fontWeight: "600",
    },
});
