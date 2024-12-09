import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
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
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#EEE',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

const TablePDF = ({ products, categories }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Productos</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>ID</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>ARTICULO</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>CATEGORIA</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>PRECIO</Text></View>
          </View>
          {products.slice(0, 4).map((product) => (
            <View style={styles.tableRow} key={product.id}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{product.id}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{product.nombre}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{product.categoria}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{product.precio}</Text></View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text>Categorías</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>ID</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>CATEGORIA</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>DESCRIPCIÓN</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>ESTADO</Text></View>
          </View>
          {categories.map((category) => (
            <View style={styles.tableRow} key={category.idCategoria}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{category.idCategoria}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{category.nombreCategoria}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{category.descripcionCategoria}</Text></View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {category.estado === 1 ? "Activo" : "Inactivo"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default TablePDF;
