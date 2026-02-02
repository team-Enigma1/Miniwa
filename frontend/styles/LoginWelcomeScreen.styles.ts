import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  
  potsContainer: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
  },
  pot: {
    alignItems: 'center',
  },

image: {
  width: 250,
  height: 250,
  resizeMode: 'contain',
},


  // Text Styles
  textContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 20,
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Buttons
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 40,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    borderRadius: 8,
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
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#A9E9C0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});


export default styles