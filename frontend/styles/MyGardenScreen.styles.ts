import { StyleSheet } from 'react-native';

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
    paddingTop: 12,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },

  // Tab Container
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#2ECC71',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#999999',
  },
  tabTextActive: {
    color: '#2ECC71',
  },

  // Plant List
  plantList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  plantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  plantImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  plantEmoji: {
    fontSize: 32,
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  plantMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaIcon: {
    fontSize: 12,
  },
  metaText: {
    fontSize: 11,
    color: '#666666',
  },
  harvestDate: {
    fontSize: 13,
    color: '#666666',
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Floating Add Button
  addButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2ECC71',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,
  },
  addButtonIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});
export default styles
