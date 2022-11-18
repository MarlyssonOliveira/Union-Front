import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';

export default function SucessoCadastro({navigation}) {
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
                name="check-circle-outline"
                type='material-community'
                color="#1DB954"
                size={200}
            />
            
                <Text style={styles.titleStyle}>Cadastro realizado com sucesso!</Text>
            </View>
            <Button
                buttonStyle= {styles.button.buttonStyle}
                style={styles.button.style}
                title="Ir para o login"
                raised="true"
                onPress={()=>{navigation.navigate("Login")}}
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
        buttonStyle:{
            backgroundColor: "#1DB954",
            borderRadius:10,
            width: 350
        },
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