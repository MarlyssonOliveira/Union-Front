import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Image, Input } from 'react-native-elements';

export default function CadastroSeguranca() {
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
            <View>
                <Text style={{fontSize: 30, fontFamily:"PoppinsExtraBold"}}>Cadastro</Text>
                <Text  style={{fontSize: 16, fontFamily:"PoppinsMedium"}}>informações de segurança</Text>
            </View>
            
            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>senha</Text>
                <Input
                    secureTextEntry={true}
                    placeholder='Digite sua senha'
                    inputContainerStyle={{borderBottomWidth: 0}}
                    inputStyle={{fontFamily:"PoppinsSemiBold",height: 50}}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                    style={{alignSelf:"center"}}
                />
            </View>
            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>confirme sua senha</Text>
                <Input
                    secureTextEntry={true}
                    placeholder='Digite a confirmação de senha'
                    inputContainerStyle={{borderBottomWidth: 0}}
                    inputStyle={{fontFamily:"PoppinsSemiBold",height: 50}}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                    style={{alignSelf:"center"}}
                />
            </View>
            <View style={{flexBasis: 150, justifyContent: "space-evenly"}}>
                <Button
                    buttonStyle= {{
                        backgroundColor: "#1DB954",
                        borderRadius:10
                    }}
                    title="Finalizar cadastro"
                    raised="true"
                    containerStyle={{
                        borderRadius:10
                    }}
                    titleStyle={{color:"#FFF", fontFamily:"PoppinsExtraBold"}}
                />
                <Button
                    buttonStyle= {{
                        backgroundColor: "#fff",
                        borderRadius:10,
                        width: 340,
                        borderColor:"#1DB954",
                        borderWidth: 1
                    }}
                    type="outline"
                    raised="true"
                    containerStyle={{
                        borderRadius:10,
                        width: 340
                    }}
                    title="Etapa anterior"
                    titleStyle={{color:"#1DB954", fontFamily:"PoppinsExtraBold"}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
});