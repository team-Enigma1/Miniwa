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

    /* 通知設定 */
    settingRow: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    settingRowLeft: {
        fontSize: 16,
    },

    settingRowRight: {
        fontSize: 24,
        color: '#555',
        marginLeft: 10,
    },
});


