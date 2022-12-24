import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';
import { useState } from 'react';
import axios from "axios";

export default function NovoCondominio({navigation}) {

    const [Nome,setNome] = useState()
    const [Endereco,setEndereco] = useState()
    const [erroNome, setErroNome] = useState('');
    const [erroEndereco, setErroEndereco] = useState('');
    const [validar, setValidar] = useState(false);
    const [erroForm, setErroForm] = useState('');

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });

    function validarCampos(){
        if(erroEndereco=='' && erroNome==''){
            setValidar(true);
        }else{
            setValidar(false)
        }
    }

    function validaNome(){
        if(Nome.length<1){
            setErroNome('Preencha o nome do condomínio corretamente')
        }
    }

    function validaEndereco(){
        if(Endereco.length<1){
            setErroEndereco('Preencha o endereco corretamente')
        }
    }
    
      if (!loaded) {
        return null;
      }
    
      function CriarCondominio(){
        if(validar){
            var novoCondominio = {
                "name": Nome,
                "address": Endereco,
            }
            axios.post("http://192.168.0.107:8080/union/condominium",novoCondominio,{headers:{'Content-Type': 'application/json', 'token' : global.sessionID}})
            .then((response) => {
                console.log(response.data)
                navigation.navigate("AdmCondominio", {
                    idCondominio : response.data.unionIdentifier
                })
            }).catch((err) =>{
                console.log(err)
            })
        }else{
            setErroForm('Preencha os campos corretamente')
        }
        
      }

    useEffect(()=>{
        validarCampos()
    })

    useEffect(()=>{
        validaNome()
    })

    useEffect(()=>{
        validaEndereco()
    })


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
                    onChangeText = {(nome) => setNome(nome)}
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
                    onChangeText = {(endereco) => setEndereco(endereco)}
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
                title="Salvar"
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