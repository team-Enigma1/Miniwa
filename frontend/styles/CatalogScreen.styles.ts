import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },

// ヘッダー
header: {
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  position: 'relative',
},

backButton: {
  position: 'absolute',
  left: 15,
  height: '100%',
  justifyContent: 'center',
},

headerTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#2C3E50',
},



  // 検索バー
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 0, 
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2C3E50',
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  // 季節フィルター
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#2ECC71',
    borderColor: '#2ECC71',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },

  // カードコンテナ
  cardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },

  // 植物カード
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardShadowWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: '#F0F0F0',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
  },
  imagePlaceholderText: {
    fontSize: 80,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  cardContent: {
    padding: 16,
  },
  plantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  plantDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },

  // 追加ボタン
  buttonContainer: {
  position: 'absolute',
  bottom: 20,
  left: 20,
  right: 20,
  zIndex: 100,
  },
  
  addButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles

