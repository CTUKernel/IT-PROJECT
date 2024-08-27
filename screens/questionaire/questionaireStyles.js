import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'flex-end',
  },
  form: {
    marginTop: 25,
    paddingHorizontal: 25,
    width: 350,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'NettoBlack',
    fontSize: 22,
    marginBottom: 8,
    color: '#5195ba',
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#86c8eb',
    borderRadius: 5,
    marginBottom: 8,
  },
  selectedOptionButton: {
    backgroundColor: '#5195ba',
  },
  optionText: {
    fontFamily: 'NettoBold',
    color: '#ffefe0',
    textAlign: 'center',
    fontSize: 20,
  },
  submitButton: {
    width: 200,
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#ffefe0',
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 50,
  },
  submitButtonText: {
    fontFamily: 'NettoBlack',
    color: '#5195ba',
    fontSize: 25,
  },
  adviceContainer: {
    padding: 16,
    paddingBottom: 5,
    backgroundColor: '#ffefe0',
    borderRadius: 10,
    marginTop: -10,
    marginBottom: 50,
  },
  categoryContain: {
    marginLeft: 5,
    marginBottom: 20,
  },
  categoryTitle: {
    color: '#5195ba',
    fontFamily: 'NettoBold',
    textAlign: 'left',
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  adviceTitle: {
    color: '#86c8eb',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'NettoBlack',
    marginBottom: 8,
  },
  adviceText: {
    color: '#5195ba',
    fontFamily: 'NettoRegular',
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 4,
    marginLeft: 20,
    marginRight: 10,
  },
});

  export default styles;