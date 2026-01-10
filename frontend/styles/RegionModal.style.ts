import { StyleSheet } from "react-native";

export default StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
    },
    picker:{
        height: 200,
        width: "100%",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20,
    },
    cancel: {
        marginRight: 200,
        color: "#999",
    },
    save: {
        color: "#2ECC71",
        fontWeight: "600",
    },
    item: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    selectedItem: {
        backgroundColor: "#EAF8F0",
    },
    itemText: {
        fontSize: 16,
    },
    selectedText: {
        fontWeight: "600",
        color: "#2ECC71",
    },
});
