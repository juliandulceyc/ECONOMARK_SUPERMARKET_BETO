import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos estáticos
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

// Estilos dinámicos
const getColStyle = (columnsCount) => ({
  width: `${100 / columnsCount}%`,
  borderStyle: 'solid',
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0,
});

const getHeaderColStyle = (columnsCount) => ({
  ...getColStyle(columnsCount),
  backgroundColor: '#A9A9A9',
});

const TablePDF = ({ data = [], columns = [] }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Reporte</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          {columns.map((col, i) => (
            <View key={i} style={getHeaderColStyle(columns.length)}>
              <Text style={styles.tableCellHeader}>{col.label.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        {data.slice(0, 15).map((item, i) => (
          <View key={i} style={styles.tableRow}>
            {columns.map((col, j) => (
              <View key={j} style={getColStyle(columns.length)}>
                <Text style={styles.tableCell}>
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

export default TablePDF;
