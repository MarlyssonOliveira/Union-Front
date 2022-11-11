import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';

export default function NovoCondominio({navigation}) {
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
            <View style={{paddingStart:25, alignSelf:'flex-start'}}>
                <Text style={{fontSize: 30, fontFamily:"PoppinsExtraBold"}}>Novo Condomínio</Text>
            </View>
            
            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>nome</Text>
                <Input
                    placeholder='Digite o nome'
                    inputContainerStyle={{borderBottomWidth: 0, alignItems: 'center'}}
                    inputStyle={{fontFamily:"PoppinsRegular",height: 55}}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                    style={{alignSelf:"center"}}
                />
            </View>

            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>endereço</Text>
                <Input
                    placeholder='Digite o endereço'
                    inputContainerStyle={{borderBottomWidth: 0, alignItems: 'center'}}
                    inputStyle={{fontFamily:"PoppinsRegular",height: 55}}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                    style={{alignSelf:"center"}}
                />
            </View>

            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>CSV dos moradores</Text>
                <Input
                    placeholder='selecione um arquivo'
                    inputContainerStyle={{borderBottomWidth: 0, alignItems: 'center'}}
                    inputStyle={{fontFamily:"PoppinsRegular",height: 55}}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                    style={{alignSelf:"center"}}
                    rightIcon={
                        <Icon
                            name="upload"
                            size={25}
                            type="font-awesome"
                            color="#1DB954"
                            
                        />
                    }
                />
            </View>
            <Button
                buttonStyle= {{
                    backgroundColor: "#1DB954",
                    borderRadius:10,
                    width: 350
                }}
                style={{alignSelf:"center"}}
                title="Salvar"
                raised="true"
                onPress={()=>navigation.navigate("Home")}
                containerStyle={{
                    borderRadius:10
                }}
                titleStyle={{color:"#FFF", fontFamily:"PoppinsExtraBold"}}
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
});