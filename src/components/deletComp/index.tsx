import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme } from 'uTradeMobileApplication/src/hooks'

interface props {
    title: string | any
    des: string | any
    onPress?:()=> void
}

const DeleteComp = ({
    title,
    des,
    onPress
}: props) => {

    
    return (
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.top} onPress={onPress}>
                <Text style={styles.delete}>{title}</Text>
                <Entypo
                    name='chevron-right'
                    color={'black'}
                    size={18}
                />
            </TouchableOpacity>
            <Text style={styles.des}>
                {des}
            </Text>
        </View>
    )
}

export default DeleteComp

const styles = StyleSheet.create({
    delete: {
        color: "black",
        marginBottom: 5
    },
    des: {
        color: "grey",
    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    mainView: {
        marginTop: 10
    }
})