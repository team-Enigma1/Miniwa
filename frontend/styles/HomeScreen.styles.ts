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
    paddingBottom: 120,
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
  fontSize: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addPlantIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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

// 報告カード
tipCardReportBox: {
  marginHorizontal: 20,
  padding: 16,
  borderRadius: 16,
  backgroundColor: '#E8F5E9',      
  borderColor: 'rgba(53, 58, 55, 0.08)',
  borderWidth: 1,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.02,
  shadowRadius: 4,
  elevation: 2,
},
  
    // アドバイスカード
  tipCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF', 
    borderColor: 'rgba(53, 58, 55, 0.08)',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
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
  
  // ToDoコンテナ
  todoContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(53, 58, 55, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
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
    borderColor: 'rgba(53, 58, 55, 0.08)',
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

});


export default styles