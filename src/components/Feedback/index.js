import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';

export default function Feedback({navigation, route}) {
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });
    
      if (!loaded) {
        return null;
      }
    return (
        <View style={styles.container}>
            <View style={styles.iconStyle}>
            <Icon 
                name={(route.params.tipo ? "check-circle-outline" : "close-circle-outline")}
                type='material-community'
                color= {(route.params.tipo ? "#1DB954" : "#E91429")}
                size={200}
            />
            
                <Text style={styles.titleStyle}>{route.params.mensagem}</Text>
            </View>
            <Button
                buttonStyle= {{
                    backgroundColor: route.params.tipo ? "#1DB954" : "#E91429",
                    borderRadius:10,
                    width: 350
                }}
                style={styles.button.style}
                title={route.params.textoBotao}
                raised="true"
                onPress={()=>{route.params.retornoEspecifico ? navigation.navigate(route.params.destinoBotao) : navigation.goBack()}}
                containerStyle={styles.button.containerStyle}
                titleStyle={styles.button.titleStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    iconStyle:{
        alignItems:'center'
    },
    titleStyle:{
        fontSize: 30,
        marginTop:50, 
        fontFamily:"PoppinsExtraBold", 
        textAlign: 'center'
    },
    button:{
        style:{
            alignSelf:"center"
        },
        containerStyle:{
            borderRadius:10
        },
        titleStyle:{
            color:"#FFF", 
            fontFamily:"PoppinsExtraBold"
        }
    }
});