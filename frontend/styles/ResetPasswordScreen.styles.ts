import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  // コンテナ全体
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // 背景をログイン画面に統一
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  // 戻るボタン
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  // タイトル
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 30,
    color: '#2C3E50', // ログイン画面タイトル色に統一
    textAlign: 'center',
  },
  // 入力欄
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF', // 白背景
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: 16,

    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // ボタン
  button: {
    backgroundColor: '#2ECC71', // ログイン画面ボタン色に統一
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  // ボタン文字
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
});


export default styles