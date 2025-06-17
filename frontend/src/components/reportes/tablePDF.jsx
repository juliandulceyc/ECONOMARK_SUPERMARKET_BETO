import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#343a40',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  headerCell: {
    backgroundColor: '#0d6efd',
    color: '#ffffff',
    fontWeight: 'bold',
    padding: 6,
    borderStyle: 'solid',
    borderColor: '#dee2e6',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    textAlign: 'center',
  },
  bodyCell: {
    padding: 5,
    borderStyle: 'solid',
    borderColor: '#dee2e6',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    textAlign: 'center',
  },
  zebra: {
    backgroundColor: '#f1f3f5',
  },
});

// Dinámicos
const getColStyle = (columnsCount, isHeader = false) => ({
  width: `${100 / columnsCount}%`,
  ...(isHeader ? styles.headerCell : styles.bodyCell),
});

const TablePDF = ({ data = [], columns = [], title = 'Reporte' }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Reporte de {title}</Text>
      <View style={styles.table}>
        {/* Encabezado */}
        <View style={styles.tableRow}>
          {columns.map((col) => (
            <View key={col.key} style={getColStyle(columns.length, true)}>
              <Text>{col.label.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        {/* Filas */}
        {data.slice(0, 50).map((item) => (
          <View
            key={item.id ?? columns.map(col => item[col.key]).join('-')}
            style={[
              styles.tableRow,
              data.indexOf(item) % 2 === 1 ? styles.zebra : null,
            ]}
          >
            {columns.map((col) => (
              <View key={col.key} style={getColStyle(columns.length, false)}>
                <Text>
                  {item[col.key] != null ? String(item[col.key]) : '-'}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

TablePDF.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default TablePDF;
