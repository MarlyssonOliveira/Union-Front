import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from "axios";
import * as Progress from 'react-native-progress'

export default function NovoCondominio({navigation}) {

    const [Nome,setNome] = useState('')
    const [Endereco,setEndereco] = useState('')
    const [erroNome, setErroNome] = useState('');
    const [erroEndereco, setErroEndereco] = useState('');
    const [validar, setValidar] = useState(false);
    const [erroForm, setErroForm] = useState('');
    const [count, setCount] = useState(0);
    const [countNome, setCountNome] = useState(0);
    const [countEndereco, setCountEndereco] = useState(0);
    const [spin, setSpin] = useState(false);

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });

    function validarCampos(){
        if(count>0){
            if(erroEndereco=='' && erroNome==''){
                if(countNome>0 && countEndereco>0){
                    setValidar(true);
                }
            }else{
                setValidar(false)
            }
        }
        
    }

    function validaNome(nome){
        setErroForm('')
        if(count>0){
            if(nome.length<1){
                setErroNome('Preencha o nome do condomínio corretamente')
            }else{
                setErroNome('')
            }
        }
        
    }

    function validaEndereco(endereco){
        setErroForm('')
        if(count>0){
            if(endereco.length<1){
                setErroEndereco('Preencha o endereco corretamente')
            }else{
                setErroEndereco('')
            }
        }
        
    }
    
    useEffect(()=>{
        validarCampos()
    })


      if (!loaded) {
        return null;
      }
    
      function CriarCondominio(){
        if(validar){
            setSpin(true)
            setValidar(false)
            var novoCondominio = {
                "name": Nome,
                "address": Endereco,
            }
            axios.post(global.baseURL+":8080/union/condominium",novoCondominio,{headers:{'Content-Type': 'application/json', 'token' : global.sessionID}})
        .then((response) => {
            setSpin(false)
            navigation.navigate("Feedback", {
                tipo : true,
                retornoEspecifico: true,
                mensagem : "Condominio criado com sucesso!",
                textoBotao : "Pagina inicial!",
                destinoBotao : "Home"

            })
            }).catch((error) =>{
                setSpin(false)
                if(error.response != undefined){
                    console.log(error.response.data.message)
                }
                navigation.navigate("Feedback", {
                    tipo : false,
                    retornoEspecifico: true,
                    mensagem : "Ocorreu um erro inesperado no sistema!",
                    textoBotao : "Pagina Inicial",
                    destinoBotao: "Home"
                })
            })
        }else{
            setErroForm('Preencha os campos corretamente')
        }
        
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
                    onChangeText = {(nome) => {
                        setNome(nome)
                        validaNome(nome)
                        setCount(count+1)
                        setCountNome(1)
                    }}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                    errorMessage={erroNome}
                />
            </View>

            <View>
                <Text style={styles.input.label}>Endereço</Text>
                <Input
                    placeholder='Digite o endereço'
                    inputContainerStyle={styles.input.inputContainerStyle}
                    onChangeText = {(endereco) => {
                        setCount(count+1)
                        setEndereco(endereco)
                        validaEndereco(endereco)
                        setCountEndereco(1)
                    }}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                    errorMessage={erroEndereco}
                />
            </View>
            <Text style={styles.errorMessage}>{erroForm}</Text>
            <Button
                buttonStyle= {styles.button.buttonStyle}
                style={styles.input.style}
                title={spin != false ?
                <Progress.Circle size={25} indeterminate={true} borderWidth={3} color={'#f6f7f9'} />: 'Entrar'}
                raised="true"
                onPress={()=>CriarCondominio()}
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
    },
    errorMessage:{
        color:'red',
    }
});