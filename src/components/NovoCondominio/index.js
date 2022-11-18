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
            <View style={styles.flexTitle}>
                <Text style={styles.title}>Novo Condomínio</Text>
            </View>
            
            <View>
                <Text style={styles.input.label}>Nome</Text>
                <Input
                    placeholder='Digite o nome'
                    inputContainerStyle={styles.input.inputContainerStyle}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                />
            </View>

            <View>
                <Text style={styles.input.label}>Endereço</Text>
                <Input
                    placeholder='Digite o endereço'
                    inputContainerStyle={styles.input.inputContainerStyle}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                />
            </View>

            <View>
                <Text style={styles.input.label}>CSV dos moradores</Text>
                <Input
                    placeholder='selecione um arquivo'
                    inputContainerStyle={styles.input.inputContainerStyle}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
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
                buttonStyle= {styles.button.buttonStyle}
                style={styles.input.style}
                title="Salvar"
                raised="true"
                onPress={()=>navigation.navigate("Home")}
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
    flexTitle:{
        paddingStart:25, 
        alignSelf:'flex-start'
    },
    title:{
        fontSize: 30, 
        fontFamily:"PoppinsExtraBold"
    },
    input:{
        label:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold", 
            color:"#000000"
        },
        inputContainerStyle:{
            borderBottomWidth: 0, 
            alignItems: 'center'
        },
        inputStyle:{
            fontFamily:"PoppinsRegular",
            height: 55
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
        containerStyle:{
            borderRadius:10
        },
        titleStyle:{
            color:"#FFF", 
            fontFamily:"PoppinsExtraBold"
        }
    }
});