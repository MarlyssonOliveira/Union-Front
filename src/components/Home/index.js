import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Image } from 'react-native-elements';
import logo from '../../assets/images/logo.svg'


export default function Home() {
    
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
                source={{ uri: logo }}
                style={{ width:300, height: 250, flexGrow:1}}
            />
            <View style={{flexBasis: 150, justifyContent: "space-evenly"}}>
                <Button
                    buttonStyle= {{
                        backgroundColor: "#1DB954",
                        borderRadius:"10px",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 1,
                            height: 3,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 3.5,
                        elevation: 3
                    }}
                    style={styles.buttons}
                    title="Entrar"
                    titleStyle={{color:"#FFF", fontFamily:"PoppinsExtraBold"}}
                />
                <Button
                    buttonStyle= {{
                        backgroundColor: "#191414",
                        borderRadius:"10px",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 1,
                            height: 3,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 3.5,
                        elevation: 3
                    }}
                    style={styles.buttons}
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
    buttons:{
        width: 340,
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }
});