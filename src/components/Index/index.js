import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Image } from 'react-native-elements';

export default function Index() {
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf")
      });
    
      if (!loaded) {
        return null;
      }
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 40, fontFamily:"PoppinsExtraBold",flexShrink:3}}>union</Text>
            <Image
                source={require('../../assets/images/teste.jpg')}
                style={{width: 350, height: 300}}
            />
            <View style={{flexBasis: 150, justifyContent: "space-evenly"}}>
                <Button
                    buttonStyle= {{
                        backgroundColor: "#1DB954",
                        borderRadius:10
                    }}
                    title="Entrar"
                    raised="true"
                    containerStyle={{
                        borderRadius:10
                    }}
                    titleStyle={{color:"#FFF", fontFamily:"PoppinsExtraBold"}}
                />
                <Button
                    buttonStyle= {{
                        backgroundColor: "#191414",
                        borderRadius:10,
                        width: 340
                    }}
                    raised="true"
                    containerStyle={{
                        borderRadius:10,
                        width: 340
                    }}
                    title="Cadastre-se"
                    titleStyle={{color:"#FFF", fontFamily:"PoppinsExtraBold"}}
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