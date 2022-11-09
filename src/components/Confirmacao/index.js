import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';

export default function Confirmacao() {
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
            <View style={{alignItems:'center'}}>
            <Icon
                name="alert-outline"
                type='material-community'
                color="#E91429"
                size={200}
            />
            
                <Text style={{fontSize: 30,marginTop:50, fontFamily:"PoppinsExtraBold", textAlign: 'center'}}>Tem certeza?</Text>
                <Text style={{fontSize: 15, fontFamily:"PoppinsMedium"}}>Ao confirmar o --- será confirmado</Text>
            </View>
            <View style={{height:125, justifyContent:'space-between'}}>
                <Button
                    buttonStyle= {{
                        backgroundColor: "#E91429",
                        borderRadius:10,
                        width: 350
                    }}
                    style={{alignSelf:"center"}}
                    title="Confirmar"
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
                    title="Cancelar"
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
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});