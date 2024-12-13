import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";

const VotingTable = ({}: any) => {
  const data = [
    {
      srNo: "01",
      houseNo: "01",
      name: "M. Haneef",
      fatherName: "M. Ramzan",
      age: "68",
      cnic: "35201-73007",
    },
    {
      srNo: "02",
      houseNo: "01",
      name: "Javed Iqbal",
      fatherName: "M. Haneef",
      age: "26",
      cnic: "35301-95917",
    },
    {
      srNo: "03",
      houseNo: "01",
      name: "Azhar Iqbal",
      fatherName: "M. Haneef",
      age: "22",
      cnic: "35301-95927",
    },
    // Add more data as needed
  ];

  const renderRow = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.srNo}</Text>
      <Text style={styles.cell}>{item.houseNo}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.fatherName}</Text>
      <Text style={styles.cell}>{item.age}</Text>
      <Text style={styles.cell}>{item.cnic}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Table */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true} alwaysBounceHorizontal>
        <View>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.cell, { width: 60 }]}>
              Sr No.
            </Text>
            <Text style={[styles.tableHeaderText, styles.cell, { width: 80 }]}>
              House No.
            </Text>
            <Text style={[styles.tableHeaderText, styles.cell, { width: 120 }]}>
              Name
            </Text>
            <Text style={[styles.tableHeaderText, styles.cell, { width: 120 }]}>
              Father’s Name
            </Text>
            <Text style={[styles.tableHeaderText, styles.cell, { width: 60 }]}>
              Age
            </Text>
            <Text style={[styles.tableHeaderText, styles.cell, { width: 150 }]}>
              CNIC No.
            </Text>
          </View>

          {/* Table Rows */}
          <ScrollView style={{ height: "75%" }}>
            {data.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.cell, { width: 60 }]}>{item.srNo}</Text>
                <Text style={[styles.cell, { width: 80 }]}>{item.houseNo}</Text>
                <Text style={[styles.cell, { width: 120 }]}>{item.name}</Text>
                <Text style={[styles.cell, { width: 120 }]}>
                  {item.fatherName}
                </Text>
                <Text style={[styles.cell, { width: 60 }]}>{item.age}</Text>
                <Text style={[styles.cell, { width: 150 }]}>{item.cnic}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default VotingTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    color: "#0f0",
  },
  totalText: {
    fontSize: 18,
    color: "#0f0",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  filterText: {
    fontSize: 16,
    color: "#fff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#333",
    paddingVertical: 10,
  },
  tableHeaderText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#222",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  cell: {
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 5,
  },
});
