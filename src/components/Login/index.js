import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Image, Input } from 'react-native-elements';
import axios from "axios";
import * as Progress from 'react-native-progress'
import { useEffect , useState } from 'react';

export default function Login({navigation}) {
    const [Email, setEmail] = useState();
    const [Senha, setSenha] = useState();
    const [erroEmail, setErroEmail] = useState('');
    const [erroForm, setErroForm] = useState('');
    const [validar, setValidar] = useState(false);
    const [spin, setSpin] = useState(false);

    
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf")
    });

    function validadorEmail(email){
        var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if(email=="" || !regex.test(email)){
            setErroEmail('Preencha corretamente')
        }else{
            setErroEmail('')
        }
    }

      
    function Logar(){
        if(validar){
            setValidar(false)
            setSpin(true)
            axios.post(global.baseURL+"/union/user/login",
            {
                email:Email,
                password:Senha
            },
            {headers:{'Content-Type': 'application/json'}})
            .then((response)=>{
                    global.sessionID = response.data
                    setSpin(false)
                    navigation.navigate("Home")
            }).catch((error)=>{
                if(error.response != undefined){
                    setSpin(false)
                    if(error.response.data.message.toLowerCase().includes("password")){
                        navigation.navigate("Feedback", {
                            tipo : false,
                            retornoEspecifico: false,
                            mensagem : "Credenciais incorretas!",
                            textoBotao : "Voltar",
                        })
                    }else if(error.response.data.message.toLowerCase().includes("inactive")){
                        navigation.navigate("Feedback", {
                            tipo : false,
                            retornoEspecifico: true,
                            mensagem : "Sua conta não foi validada!",
                            textoBotao : "Clique aqui para validar",
                            destinoBotao: "CodigoVerificacao"
                        })
                    }else{
                        navigation.navigate("Feedback", {
                            tipo : false,
                            retornoEspecifico: true,
                            mensagem : "Ocorreu um erro inesperado no sistema!",
                            textoBotao : "Inicio",
                            destinoBotao: "Index"
                        })
                    }
                }else{
                    navigation.navigate("Feedback", {
                        tipo : false,
                        retornoEspecifico: true,
                        mensagem : "Ocorreu um erro inesperado no sistema!",
                        textoBotao : "Inicio",
                        destinoBotao: "Index"
                    })
                }
                
            })
        }else{
            setErroForm('Preencha os campos corretamente')
        }
                    
    }

    function validarCampos(){
        if(Senha != '' && Senha != undefined && erroEmail==''){
            setValidar(true);
        }else{
            setValidar(false)
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
            <Text style={styles.textEntrar}>Entrar</Text>
            <View>
                <Text style={styles.textEmail}>E-mail</Text>
                <Input
                    placeholder='Digite seu e-mail'
                    inputStyle={styles.inputs.inputStyle}
                    inputContainerStyle={styles.inputs.inputContainerStyle}
                    onChangeText={(email) => {
                        setEmail(email);
                        validadorEmail(email);
                        validarCampos()
                        setErroForm('')
                        
                    }}
                    keyboardType='email-address'
                    containerStyle={styles.inputs.containerStyle}
                    style={styles.inputs.alignment}
                    errorMessage={erroEmail}
                    
                />
            </View>
            <View>
                <Text style={styles.textEmail}>Senha</Text>
                <Input
                    secureTextEntry={true}
                    placeholder='Digite sua senha'
                    inputContainerStyle={styles.inputs.inputContainerStyle}
                    onChangeText={(senha)=>{
                        setSenha(senha)
                        validarCampos()
                        setErroForm('')
                    }}
                    inputStyle={styles.inputs.inputStyle}
                    containerStyle={styles.inputs.containerStyle}
                    style={styles.inputs.alignment}
                />
            </View>
            <Text style={styles.errorMessage}>{erroForm}</Text>
            
            
            <Button
                buttonStyle= {styles.buttonLogin.buttonStyle}
                style={styles.buttonLogin.buttonAlignment}
                title={spin != false ?
                    <Progress.Circle size={25} indeterminate={true} borderWidth={3} color={'#f6f7f9'} />: 'Entrar'}
                raised="true"
                onPress={()=>{Logar()}}
                containerStyle={styles.buttonLogin.containerStyle}
                titleStyle={styles.buttonEntrar}
            />
            <Text onPress={() =>{navigation.navigate("EmailRecuperacaoSenha")}} style={styles.EsqueciSenha}>Esqueci minha senha</Text>
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
    textEntrar:{
        alignSelf:'flex-start', 
        paddingStart:25, 
        fontSize: 30, 
        fontFamily:"PoppinsExtraBold"
    },
    textEmail:{
        fontSize: 20, 
        fontFamily:"PoppinsExtraBold", 
        color:"#000000"
    },
    inputs:{
        inputStyle:{
            fontFamily:"PoppinsSemiBold", 
            height: 50
        },
        containerStyle:{
            width: 350, 
            backgroundColor:"#F0F1F5", 
            borderRadius: 10,
            height: 50
        },
        inputContainerStyle:{
            borderBottomWidth: 0
        },
        alignment:{
            alignSelf:"center"
        }

    },
    buttonEntrar:{
        color:"#FFF", 
        fontFamily:"PoppinsExtraBold"
    },
    
    buttonLogin: {
        buttonStyle:{
            backgroundColor: "#1DB954",
            borderRadius:10,
            width: 350
        },
        buttonAlignment:{
            alignSelf:"center"
        },
        containerStyle:{
            borderRadius:10
        }
    },
    EsqueciSenha:{
        fontSize: 18, 
        fontFamily:"PoppinsExtraBold", 
        alignSelf:"center",
    },
    errorMessage:{
        color:'red',
        marginVertical: -20,
    }
});