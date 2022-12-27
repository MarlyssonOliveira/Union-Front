import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { useState } from 'react';
import { Button, Icon, Image, Input } from 'react-native-elements';
import axios from "axios";

export default function NovaTaxa({navigation,route}) {
    const[TituloTaxa, setTituloTaxa] = useState();
    const[ValorTaxa, setValorTaxa] = useState();
    const[VencimentoTaxa, setVencimentoTaxa] = useState();
    const[PixTaxa, setPixTaxa] = useState();

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });
    
      if (!loaded) {
        return null;
      }

      function CadastrarTaxa(){
            axios.post(global.baseURL+":8080/union/condominium/" + route.params.idCondominio + "/debt" ,{
                title: TituloTaxa,
                expirationDate: VencimentoTaxa,
                value: ValorTaxa,
                pixKey: PixTaxa
            }
            ,{
                headers: {'token' : global.sessionID}
            })
            .then((response) =>{
                navigation.navigate("Feedback", {
                    tipo : true,
                    retornoEspecifico: true,
                    mensagem : "Taxa cadastrada com Sucesso!",
                    textoBotao : "Voltar",
                    destinoBotao : "Home"
                })
            }).catch((err) =>{
                console.log(err)
            })
      }

    return (
        <View style={styles.container}>
            <View style={styles.divTitulo}>
                <Text style={styles.titulo}>Cadastro de Taxa</Text>
            </View>
            
            <View>
                <Text style={styles.labelInput}>Título</Text>
                <Input
                    placeholder='Defina um título'
                    onChangeText={(titulo)=>{setTituloTaxa(titulo)}}
                    inputContainerStyle={styles.input.inputContainerStyle}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                />
            </View>

            <View>
                <Text style={styles.labelInput}>Data de vencimento</Text>
                <Input
                    placeholder='DD/MM/AAAA'
                    onChangeText={(vencimento)=>{setVencimentoTaxa(vencimento)}}
                    inputContainerStyle={styles.input.inputContainerStyle}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                    rightIcon={
                        <Icon
                            name="calendar"
                            size={25}
                            type="font-awesome"
                            color="#1DB954"
                            
                        />
                    }
                />
            </View>

            <View>
                <Text style={styles.labelInput}>Valor</Text>
                <Input
                    placeholder='Valor em reais(R$)'
                    onChangeText={(valor)=>{setValorTaxa(valor)}}
                    inputContainerStyle={styles.input.inputContainerStyle}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                />
            </View>
            <View>
                <Text style={styles.labelInput}>Chave Pix</Text>
                <Input
                    placeholder='chave...'
                    onChangeText={(pix)=>{setPixTaxa(pix)}}
                    inputContainerStyle={styles.input.inputContainerStyle}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                />
            </View>
            <Button
                buttonStyle= {styles.button.buttonStyle}
                style={styles.input.style}
                title="Salvar"
                raised="true"
                onPress={()=>{CadastrarTaxa()}}
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
    divTitulo:{
        alignSelf:'flex-start',
        paddingStart:25
    },
    titulo:{
        fontSize: 30, 
        fontFamily:"PoppinsExtraBold"
    },
    labelInput:{
        fontSize: 20, 
        fontFamily:"PoppinsExtraBold", 
        color:"#000000"
    },
    input:{
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