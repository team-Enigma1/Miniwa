import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    /* 戻るボタン */
    backIcon: {
    position: "absolute",
    top: 60,
    left: 20,
    },

    /* タイトル */
    Title: {
        fontSize: 16,
        fontWeight: "600",
        width: '17%',
        marginTop: 10,
    },

    /* 各タイトル */
    sectionTitle: {
        width: "85%",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
        marginTop: 30,
        marginRight: 40,
    },

    /* カード */
    card: {
        width: "85%",
        backgroundColor: "#fff",
        borderColor: "#cfcfcf",
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
    },

    /* 保存ボタン */
    saveButton: {
        width: '85%',
        backgroundColor: '#35C46B',
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 30,
    },

    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
