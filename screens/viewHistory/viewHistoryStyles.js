import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  OpenLine: {
    width: 250,
    fontFamily: 'NettoBlack',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  tableContainer: {
    width: 350,
    borderWidth: 5, 
    borderColor: '#86c8eb', 
    borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#86c8eb',
  },
  cell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#86c8eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell1: {
    flex: 1,
  },
  cell2: {
    flex: 2,
  },
  cell3: {
    flex: 2.5,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  headerText: {
    fontFamily: 'NettoBlack',
  },
  rowText: {
    fontFamily: 'NettoRegular',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -250,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#86c8eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffefe0',
    fontSize: 20,
    fontFamily: 'NettoBlack',
    fontWeight: 'bold',
  },
});

export default styles;
