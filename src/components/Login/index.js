import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Image, Input } from 'react-native-elements';
import axios from "axios";
import { useEffect , useState } from 'react';

export default function Login({navigation}) {
    const [Email, setEmail] = useState();
    const [Senha, setSenha] = useState();
    const [erroEmail, setErroEmail] = useState('');
    const [erroForm, setErroForm] = useState('');
    const [validar, setValidar] = useState(false);

    
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
            axios.post(global.baseURL+":8080/union/user/login",
            {
                email:Email,
                password:Senha
            },
            {headers:{'Content-Type': 'application/json'}})
            .then((response)=>{
                    console.log(response.data)
                    global.sessionID = response.data
                    navigation.navigate("Home")
            }).catch((err)=>{   
                console.log(err) 
                navigation.navigate("Feedback", {
                    tipo : false,
                    retornoEspecifico: false,
                    mensagem : "Ocorreu um erro inesperado!",
                    textoBotao : "Voltar",
                })
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
                title="Entrar"
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