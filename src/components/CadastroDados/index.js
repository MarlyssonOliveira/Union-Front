import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Image, Input } from 'react-native-elements';

export default function CadastroDados({navigation}) {
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
            <View style={styles.cabecalho.flex}>
                <Text style={styles.cabecalho.titulo1}>Cadastro</Text>
                <Text  style={styles.cabecalho.titulo2}>informações pessoais e de contato</Text>
            </View>
            
            <View>
                <Text style={styles.input.label}>nome completo</Text>
                <Input
                    placeholder='Digite seu nome'
                    inputStyle={styles.input.inputStyle}
                    inputContainerStyle={styles.input.inputContainerStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                />
            </View>
            <View>
                <Text style={styles.input.label}>e-mail</Text>
                <Input
                    placeholder='Digite seu e-mail'
                    inputStyle={styles.input.inputStyle}
                    inputContainerStyle={styles.input.inputContainerStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}

                />
            </View>
            <View>
                <Text style={styles.input.label}>telefone</Text>
                <Input
                    placeholder='(xx)x.xxxx-xxxx'
                    inputStyle={styles.input.inputStyle}
                    inputContainerStyle={styles.input.inputContainerStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                />
            </View>
            <Button
                buttonStyle= {styles.button.buttonStyle}
                style={styles.button.style}
                title="Próxima etapa"
                raised="true"
                onPress={()=>{navigation.navigate("CadastroSeguranca")}}
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

    cabecalho:{
        flex:{
            alignSelf:'flex-start', 
            paddingStart:25
        },
        titulo1:{
            fontSize: 30, 
            fontFamily:"PoppinsExtraBold"
        },
        titulo2:{
            fontSize: 16, 
            fontFamily:"PoppinsMedium"
        }
    },

    input:{
        label:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold", 
            color:"#000000"
        },
        inputStyle:{
            fontFamily:"PoppinsRegular", 
            height: 55
        },
        inputContainerStyle:{
            borderBottomWidth: 0
        },
        containerStyle:{
            width: 350, 
            backgroundColor:"#F0F1F5", 
            borderRadius: 10,
            height: 50
        },
        style:{
            alignSelf:"center" 
        }
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