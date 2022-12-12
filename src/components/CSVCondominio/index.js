import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';
import { useState } from 'react';
import axios from "axios";

export default function CSVCondominio({navigation}) {

    const [Csv,setCSV] = useState()

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });
    
      if (!loaded) {
        return null;
      }
    
      function AdicionarMoradores(){

        axios.post("http://192.168.0.107:8080/union/condominium",novoCondominio,{headers:{'Content-Type': 'application/json', 'token' : global.sessionID}})
        .then((response) => {
            console.log(response)
        }).catch((err) =>{
            console.log(err)
        })
      }
    return (
        <View style={styles.container}>
            <Icon
                name="file-table-outline"
                type='material-community'
                color="#1DB954"
                size={200}
            />
            <View style={styles.flexTitle}>
                <Text style={styles.titulos.titulo}>Adicione Moradores</Text>
                <Text style={styles.titulos.subtitulo}>O CSV deve conter uma coluna com os emails dos moradores e outra com o nímero da residencia.</Text>

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
                title="Adicionar"
                raised="true"
                onPress={()=>AdicionarMoradores()}
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
    titulos:{
        titulo:{
            fontSize: 25,
            marginTop:50, 
            fontFamily:"PoppinsExtraBold", 
            textAlign: 'center'
        },
        subtitulo:{
            fontSize: 14, 
            fontFamily:"PoppinsRegular", 
            color:"#ADADAD", 
            textAlign: 'center'
        }
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