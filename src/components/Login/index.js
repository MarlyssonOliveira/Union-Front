import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Image, Input } from 'react-native-elements';

export default function Login({navigation}) {
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf")
      });
    
      if (!loaded) {
        return null;
      }
    return (
        <View style={styles.container}>
            <Text style={styles.textEntrar}>Entrar</Text>
            <View>
                <Text style={styles.textEmail}>E-mail</Text>
                <Input
                    placeholder='Digite seu e-mail'
                    inputStyle={styles.inputs.inputStyle}
                    inputContainerStyle={styles.inputs.inputContainerStyle}
                    containerStyle={styles.inputs.containerStyle}
                    style={styles.inputs.alignment}
                />
            </View>
            <View>
                <Text style={styles.textEmail}>Senha</Text>
                <Input
                    secureTextEntry={true}
                    placeholder='Digite sua senha'
                    inputContainerStyle={styles.inputs.inputContainerStyle}
                    inputStyle={styles.inputs.inputStyle}
                    containerStyle={styles.inputs.containerStyle}
                    style={styles.inputs.alignment}
                />
            </View>
            <Button
                buttonStyle= {styles.buttonLogin.buttonStyle}
                style={styles.buttonLogin.buttonAlignment}
                title="Entrar"
                raised="true"
                onPress={()=>{navigation.navigate("Home")}}
                containerStyle={styles.buttonLogin.containerStyle}
                titleStyle={styles.buttonEntrar}
            />

            <Text onPress={() =>{navigation.navigate("CodigoVerificacao")}} style={styles.EsqueciSenha}>Esqueci minha senha</Text>
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
    textEntrar:{
        alignSelf:'flex-start', 
        paddingStart:25, 
        fontSize: 30, 
        fontFamily:"PoppinsExtraBold"
    },
    textEmail:{
        fontSize: 20, 
        fontFamily:"PoppinsExtraBold", 
        color:"#000000"
    },
    inputs:{
        inputStyle:{
            fontFamily:"PoppinsSemiBold", 
            height: 50
        },
        containerStyle:{
            width: 350, 
            backgroundColor:"#F0F1F5", 
            borderRadius: 10,
            height: 50
        },
        inputContainerStyle:{
            borderBottomWidth: 0
        },
        alignment:{
            alignSelf:"center"
        }

    },
    buttonEntrar:{
        color:"#FFF", 
        fontFamily:"PoppinsExtraBold"
    },
    
    buttonLogin: {
        buttonStyle:{
            backgroundColor: "#1DB954",
            borderRadius:10,
            width: 350
        },
        buttonAlignment:{
            alignSelf:"center"
        },
        containerStyle:{
            borderRadius:10
        }
    },
    EsqueciSenha:{
        fontSize: 18, 
        fontFamily:"PoppinsExtraBold", 
        alignSelf:"center",
    }
});