import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',

  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: '#1A1A1A',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSpacer: {
    width: 40,
  },

  // Record Card
  recordCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  recordDate: {
    fontSize: 12,
    color: '#999999',
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 8,
  },
  recordImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E8F5E9',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordImagePlaceholder: {
    fontSize: 80,
    opacity: 0.3,
  },
  imagePlaceholderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 40,
    opacity: 0.5,
  },
  recordContent: {
    padding: 16,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  recordDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 20,
  },

  // Floating Add Button
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: '#2ECC71',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});

export default styles
