import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 60,
    },

    /* アイコン */
    iconCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconText: {
        fontSize: 45,
    },
    iconImage: { 
        width: 90, 
        height: 90, 
        borderRadius: 45,
    },

    /* 名前 */
    name: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 18,
    },

    /* 自己紹介 */
    bioBox: {
        width: '80%',
        backgroundColor: '#fff',
        borderColor: '#cfcfcf',
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
    },
    bioText: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
    },

    /* 編集ボタン */
    editButton: {
        width: '70%',
        backgroundColor: '#35C46B',
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 30,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    /* 設定 */
    settingSection: {
        width: '85%',
        marginTop: 10,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    dropdown: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        marginTop: 8,
        paddingHorizontal: 8,
        elevation: 4,
    },
});


