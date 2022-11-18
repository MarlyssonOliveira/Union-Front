import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Image } from 'react-native-elements';

export default function Index({navigation}) {
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf")
      });
    
      if (!loaded) {
        return null;
      }
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>union</Text>
            <Image
                source={require('../../assets/images/teste.jpg')}
                style={styles.imageStyle}
            />
            <View style={styles.botoes}>
                <Button
                    buttonStyle= {styles.botaoEntrar.buttonStyle}
                    title="Entrar"
                    raised="true"
                    onPress={()=>{navigation.navigate("Login")}}
                    containerStyle={styles.botaoEntrar.containerStyle}
                    titleStyle={styles.botaoEntrar.tituloStyle}
                />
                <Button
                    buttonStyle= {styles.botaoCadastro.buttonStyle}
                    raised="true"
                    containerStyle={styles.botaoCadastro.containerStyle}
                    title="Cadastre-se"
                    onPress={() => {navigation.navigate("CadastroDados")}}
                    titleStyle={styles.botaoEntrar.tituloStyle}
                />
            </View>

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
    botoes:{
        flexBasis: 150, 
        justifyContent: "space-evenly"
    },
    titulo:{
        fontSize: 40, 
        fontFamily:"PoppinsExtraBold",
        flexShrink:3
    },
    imageStyle:{
        width: 350, 
        height: 300
    },
    botaoEntrar:{
        buttonStyle:{
            backgroundColor: "#1DB954",
            borderRadius:10
        },
        containerStyle:{
            borderRadius:10
        },
        tituloStyle:{
            color:"#FFF", 
            fontFamily:"PoppinsExtraBold"
        }
    },
    botaoCadastro:{
        buttonStyle:{
            backgroundColor: "#191414",
            borderRadius:10,
            width: 340
        },
        containerStyle:{
            borderRadius:10,
            width: 340
        }
    }
});