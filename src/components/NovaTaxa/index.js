import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { useState, useEffect } from 'react';
import { Button, Icon, Image, Input } from 'react-native-elements';
import * as Progress from 'react-native-progress'
import MaskInput, {Masks} from 'react-native-mask-input';
import axios from "axios";

export default function NovaTaxa({navigation,route}) {
    const[TituloTaxa, setTituloTaxa] = useState('');
    const[ValorTaxa, setValorTaxa] = useState('');
    const[VencimentoTaxa, setVencimentoTaxa] = useState();
    const[PixTaxa, setPixTaxa] = useState('');
    const[erroTitulo, setErroTitulo] = useState('');
    const[erroValor, setErroValor] = useState('');
    const[erroChave, setErroChave] = useState('');
    const[erroVencimento, setErroVencimento] = useState('');
    const[erroForm, setErroForm] = useState('');
    const[validar, setValidar] = useState(false);
    const[spin, setSpin] = useState(false);



    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });
    
      

      function validaTitulo(titulo){
        setErroTitulo('')
        if(titulo.length<2){
            setErroTitulo('Preencha o título da taxa corretamente')
        }
      }

      function validarCampos(){
        
        setValidar(false)
        if(erroTitulo=='' && erroChave=='' && erroValor=='' && erroVencimento==''){
            if(TituloTaxa!='' && PixTaxa!= '' && ValorTaxa!= '' && VencimentoTaxa!=''){
                setValidar(true)
                
            }   
        }
      }

    

      function validaChavePix(chave){
        setErroChave('')
        if(chave.length<2){
            setErroChave('Preencha a chave da taxa corretamente')
        }
      }

      function validaVencimento(vencimento){
        setErroVencimento('')
        if(vencimento.length<2){
            setErroVencimento('Preencha o vencimento da taxa corretamente')
        }
      }

      function validaValor(valor){
        setErroValor('')
        valor = parseFloat(valor);
        if(valor<=0.0 || valor.toString()=='NaN'){
            setErroValor('O valor precisa ser maior que 0')
        }
      }

      function CadastrarTaxa(){
        if(validar){
            setSpin(true)
            axios.post(global.baseURL+"/union/condominium/" + route.params.idCondominio + "/debt" ,{
                title: TituloTaxa,
                expirationDate: VencimentoTaxa,
                value: ValorTaxa,
                pixKey: PixTaxa
            }
            ,{
                headers: {'token' : global.sessionID}
            })
            .then((response) =>{
                setSpin(false)
                navigation.navigate("Feedback", {
                    tipo : true,
                    retornoEspecifico: true,
                    mensagem : "Taxa cadastrada com Sucesso!",
                    textoBotao : "Voltar",
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

      useEffect(()=>{
        validarCampos()
    })

    if (!loaded) {
        return null;
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
                    onChangeText={(titulo)=>{
                        setTituloTaxa(titulo)
                        validaTitulo(titulo)
                        setErroForm('')
                    }}
                    inputContainerStyle={styles.input.inputContainerStyle}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                    errorMessage={erroTitulo}
                />
            </View>
            
            <View>
                <Text style={styles.labelInput}>Data de vencimento</Text>
                <Input
                    placeholder='DD/MM/AAAA'
                    onChangeText={(vencimento)=>{
                        setVencimentoTaxa(vencimento)
                        validaVencimento(vencimento)
                        setErroForm('')
                    }}
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
                    maxLength={10}
                    keyboardType='phone-pad'
                    errorMessage={erroVencimento}
                />
            </View>

            <View>
                <Text style={styles.labelInput}>Valor</Text>
                <Input
                    placeholder='Valor em reais(R$)'
                    onChangeText={(valor)=>{
                        setValorTaxa(valor)
                        validaValor(valor)
                        setErroForm('')
                    }}
                    inputContainerStyle={styles.input.inputContainerStyle}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                    keyboardType='numeric'
                    errorMessage={erroValor}
                />
            </View>
            <View>
                <Text style={styles.labelInput}>Chave Pix</Text>
                <Input
                    placeholder='chave...'
                    onChangeText={(pix)=>{
                        setPixTaxa(pix)
                        validaChavePix(pix)
                        setErroForm('')
                    }}
                    inputContainerStyle={styles.input.inputContainerStyle}
                    inputStyle={styles.input.inputStyle}
                    containerStyle={styles.input.containerStyle}
                    style={styles.input.style}
                    errorMessage={erroChave}
                />
            </View>
            <Text style={styles.errorMessage}>{erroForm}</Text>
            <Button
                buttonStyle= {styles.button.buttonStyle}
                style={styles.input.style}
                title={spin != false ?
                    <Progress.Circle size={25} indeterminate={true} borderWidth={3} color={'#f6f7f9'} /> : 'Salvar'}
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