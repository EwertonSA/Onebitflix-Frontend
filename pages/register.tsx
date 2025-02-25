import Footer from '../src/components/common/footer';
import HeaderGeneric from '../src/components/common/headerGeneric';
import styles from '../styles/register.module.scss';
import Head from 'next/head';
import {Form,FormGroup,Label,Container, Input, Button} from 'reactstrap'
import { FormEvent, useEffect, useState } from 'react';
import authService from '../src/services/authService';
import { useRouter } from 'next/router';
import ToastComponent from '../src/components/common/toast';


const Register=()=>{
    const router=useRouter()
    const [toastIsOpen,setToastIsOpen]=useState(false)
    const [toastMessage,setToastMEssage]=useState('')
    useEffect(()=>{
        if(sessionStorage.getItem('onebitflix-token')){
            router.push("/home")
        }
           },[])
    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
      const formData = new FormData(event.currentTarget);
      const firstName = formData.get("firstName")!.toString();
      const lastName = formData.get("lastName")!.toString();
      const phone = formData.get("phone")!.toString();
      const birth = formData.get("birth")!.toString();
      const email = formData.get("email")!.toString();
      const password = formData.get("password")!.toString();
      const confirmPassword = formData.get("confirmPassword")!.toString();
      const params = { firstName, lastName, phone, birth, email, password };
    
        if(password!= confirmPassword){
            setToastIsOpen(true);
            setTimeout(()=>{setToastIsOpen},1000*3)
            setToastMEssage("Senha e confirmação diferentes")
        }
        const {data,status}=await authService.register(params)
        if(status===201){
           router.push('/login?registred=true')

        }else{
            setToastIsOpen(true);
            setTimeout(()=>{setToastIsOpen},1000*3)
            setToastMEssage(data.message)
        }

    }
    return<>
    <Head>
        <title>Onebitflix - Registro</title>
        <script src="https://jsuites.net/v4/jsuites.js"></script>
        <link rel="shortcut icon" href="/favicon.svg" type='image/x-icon' />
    </Head>
   
    <main className={styles.main}><HeaderGeneric logoUrl="/" btnUrl="/login" btnContent="Quero fazer login" />
    <Container className='py-5'>
        <p className={styles.formTitle}><strong>Bem vindo(a) ao Onebitflix</strong></p>
        <Form onSubmit={handleRegister} className={styles.form}>
            <p className='text-center'><strong>Faça a sua conta!</strong></p>
            <FormGroup>
                <Label for="firstName" className={styles.label}>Nome</Label>
                <Input id='firstName' name='firstName' type='text' placeholder='Qual seu nome?'className={styles.inputName} required maxLength={20}/>
            </FormGroup>
            <FormGroup>
                <Label for="lastName" className={styles.label}>SOBRENOME</Label>
                <Input id='lastName' name='lastName' type='text' placeholder='Qual seu sobrenome?'className={styles.inputName} required maxLength={20}/>
            </FormGroup>
            <FormGroup>
                <Label for="phone" className={styles.label}>WHATSAPP / TELEGRAM</Label>
                <Input id='phone' name='phone' type='tel' placeholder='(xx) 9xxxx-xxxx'data-mask="[-]+55 (00) 00000-0000" className={styles.inputName} required maxLength={20}/>
            </FormGroup>
            <FormGroup>
                <Label for="email" className={styles.label}>EMAIL</Label>
                <Input id='email' name='email' type='email' placeholder='Qual seu email?'className={styles.inputName} required maxLength={20}/>
            </FormGroup>
            <FormGroup>
                <Label for="birth" className={styles.label}>DATA DE NASCIMENTO</Label>
                <Input id='birth' name='birth' type='date' min="1930-01-01" max="2020-01-01"  className={styles.inputName} required maxLength={20}/>
            </FormGroup>
            <FormGroup>
                <Label for="password" className={styles.label}>SENHA</Label>
                <Input id='password' name='password' type='password' placeholder='Digite sua senha' minLength={6} maxlength={20} className={styles.inputName} required/>
            </FormGroup>
            <FormGroup>
                <Label for="confirmPassword" className={styles.label}>CONFIRME SUA SENHA</Label>
                <Input id='confirmPassword' name='confirmPassword' type='password'placeholder='Confirme sua senha' minLength={6} maxlength={20} className={styles.inputName} required/>
            </FormGroup>
            <Button type='submit' outline className={styles.formBtn}>CADASTRAR</Button>
        </Form>
    </Container>
    <Footer/>
    <ToastComponent color="bg-danger" isOpen={toastIsOpen} message={toastMessage}/>
    </main>
    </>
}
export default Register