import { StyleSheet, Dimensions} from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // 天気ヘッダー
weatherHeader: {
  paddingHorizontal: 20,
  paddingTop: 60,
  paddingBottom: 20,
  flexDirection: 'row',      
  alignItems: 'center',      
  justifyContent: 'center',     
},

  weatherIcon: {
    fontSize: 16,
  },

weatherText: {
  textAlign: 'center',
  color: '#1A1A1A',
  fontSize: 18,
  fontWeight: '600',
},

  // セクション
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  // 植物スクロール
  plantsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  plantCard: {
    width: width * 0.75,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  plantImageContainer: {
    flex: 1,
    position: 'relative',
  },
  plantImagePlaceholder: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantEmoji: {
    fontSize: 80,
    opacity: 0.6,
  },
  plantOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  plantInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  plantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  plantStatus: {
    fontSize: 12,
    color: '#666666',
  },
  plantActionButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2ECC71',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  plantActionIcon: {
    fontSize: 20,
  },

  // 植物追加カード
  addPlantCard: {
    width: width * 0.4,
    height: 200,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2ECC71',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlantIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addPlantIconText: {
    fontSize: 28,
    color: '#2ECC71',
    fontWeight: '300',
  },
  addPlantText: {
    color: '#2ECC71',
    fontSize: 14,
    fontWeight: '600',
  },

  // ToDoコンテナ
  todoContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  todoItemCompleted: {
    opacity: 0.5,
  },
  todoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  todoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  todoIconContainerCompleted: {
    backgroundColor: '#F0F0F0',
  },
  todoIcon: {
    fontSize: 20,
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  todoTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  todoDescription: {
    fontSize: 13,
    color: '#666666',
  },
  todoDescriptionCompleted: {
    color: '#AAAAAA',
  },
  todoCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoCheckboxCompleted: {
    backgroundColor: '#2ECC71',
    borderColor: '#2ECC71',
  },
  todoCheckmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // アドバイスカード
  tipCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(46, 204, 113, 0.08)', 
    borderColor: 'rgba(46, 204, 113, 0.2)',
    borderWidth: 1,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  tipDescription: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 20,
  },

  // おすすめアイテム
  itemsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  itemCard: {
    width: 140,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemEmoji: {
    fontSize: 50,
  },
  itemCategory: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 10,
    lineHeight: 16,
  },
  itemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.2)',
  },
  itemButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2ECC71',
  },
  itemButtonIcon: {
    fontSize: 14,
  },

  // 底部ナビゲーション
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    position: 'relative',
  },
  navActiveIndicator: {
    backgroundColor: 'rgba(46, 204, 113, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 4,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 24,
  },
  navLabel: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '500',
  },
  navLabelActive: {
    fontSize: 10,
    color: '#2ECC71',
    fontWeight: '600',
    marginTop: 4,
  },
});


export default styles