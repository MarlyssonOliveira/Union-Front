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
            <Text style={{alignSelf:'flex-start', paddingStart:25, fontSize: 30, fontFamily:"PoppinsExtraBold"}}>Entrar</Text>
            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>e-mail</Text>
                <Input
                    placeholder='Digite seu e-mail'
                    inputStyle={{fontFamily:"PoppinsSemiBold", height: 50}}
                    inputContainerStyle={{borderBottomWidth: 0}}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10,height: 50}}
                    style={{alignSelf:"center"}}
                />
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
            <Button
                buttonStyle= {{
                    backgroundColor: "#1DB954",
                    borderRadius:10,
                    width: 350
                }}
                style={{alignSelf:"center"}}
                title="Entrar"
                raised="true"
                onPress={()=>{navigation.navigate("Home")}}
                containerStyle={{
                    borderRadius:10
                }}
                titleStyle={{color:"#FFF", fontFamily:"PoppinsExtraBold"}}
            />

            <Text onPress={() =>{navigation.navigate("CodigoVerificacao")}} style={{fontSize: 18, fontFamily:"PoppinsExtraBold", alignSelf:"center"}}>Esqueci minha senha</Text>
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