import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  // 画面全体のコンテナ
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // スクロールビュー
  scrollView: {
    flex: 1,
  },

  // Headerセクション
  header: {
    flexDirection: 'row', // 横並び
    alignItems: 'center', // 縦中央揃え
    justifyContent: 'space-between', // 左右にスペースを配置
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 32,
    color: '#2C3E50',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  placeholder: {
    width: 40, // Header右側の空白用
  },

  // Hero Banner（植物のイメージ表示）
heroBanner: {
  marginHorizontal: 20,
  marginVertical: 10,
  overflow: 'hidden',
  minHeight: 100,
},

heroImageBackground: {
  flex: 1,
  justifyContent: 'flex-end', 
},

heroOverlay: {
  backgroundColor: 'rgba(0,0,0,0.4)', 
  padding: 16,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
},

heroTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 6,
},

heroSubtitle: {
  fontSize: 13,
  lineHeight: 18,
  color: '#FFFFFF',
  flexWrap: 'wrap',
},


  heroEmoji: {
    fontSize: 80,
  },
  // Section（必要アイテムセクション）
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 16,
    marginBottom: 16,
  },

  // アイテムカード
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000', // 影の設定
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, // Android用影
  },
  itemImageContainer: {
    marginRight: 12,
  },
  itemImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemEmoji: {
    fontSize: 40,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
  },

  // 完了ボタン
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  completeButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // モーダル
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxHeight: '85%',
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeIcon: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '400',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 16,
  },
  amazonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  amazonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  amazonButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
  },
});

export default styles