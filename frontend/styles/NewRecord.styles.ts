import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  keyboardView: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingTop: 20, paddingBottom: 20, paddingHorizontal: 20 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  headerSpacer: { width: 40 },

  // Input Group
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, color: '#999999', marginBottom: 8, fontWeight: '500' },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  textArea: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    minHeight: 120,
  },

  // Date Input
  dateInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
    color: '#1A1A1A',
  },

  // Photo Upload
  photoUpload: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    backgroundColor: '#FAFAFA',
  },
  photoIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoIcon: { fontSize: 28 },
  photoText: { fontSize: 13, color: '#999999', fontWeight: '500' },

  // Save Button
  saveButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#FFFFFF' },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '85%',
    maxWidth: 400,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    marginBottom: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  // DatePicker Container with Background
  datePickerContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateTimePicker: {
    width: '100%',
    height: 200,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666666',
  },
  confirmButton: {
    backgroundColor: '#2ECC71',
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default styles
