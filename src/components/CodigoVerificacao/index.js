import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';

export default function CodigoVerificacao({navigation}) {
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
            <View style={{paddingHorizontal:15}}>
                <Icon
                    name="email-fast"
                    type='material-community'
                    color="#1DB954"
                    size={200}
                />

                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize: 25,marginTop:50, fontFamily:"PoppinsExtraBold", textAlign: 'center'}}>Um código foi enviado para o email informado</Text>
                    <Text style={{fontSize: 14, fontFamily:"PoppinsRegular", color:"#ADADAD", textAlign: 'center'}}>Para continuar informe o codigo abaixo</Text>
                </View>
                <View style={{alignSelf:'center', marginTop:15}}>
                    <Input
                        secureTextEntry={true}
                        placeholder='00-00-00-00'
                        inputContainerStyle={{borderBottomWidth: 0}}
                        inputStyle={{fontFamily:"PoppinsSemiBold",height: 50}}
                        containerStyle={{width: 250, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                        style={{alignSelf:"center", textAlign: 'center'}}
                    />
                </View>
            </View>

            <View style={{height:120, justifyContent: 'space-between'}}>
                <Button
                    buttonStyle= {{
                        backgroundColor: "#1DB954",
                        borderRadius:10,
                        width: 350
                    }}
                    style={{alignSelf:"center"}}
                    title="Verificar código"
                    onPress={()=>{navigation.navigate("SucessoCadastro")}}
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
                        borderColor:"#ADADAD",
                        borderWidth: 1
                    }}
                    type="outline"
                    raised="true"
                    containerStyle={{
                        borderRadius:10,
                        width: 340
                    }}
                    title="Reenviar código"
                    titleStyle={{color:"#ADADAD", fontFamily:"PoppinsExtraBold"}}
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
});