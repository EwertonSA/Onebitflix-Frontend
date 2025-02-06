import Head from 'next/head';
import HeaderGeneric from '../src/components/common/headerGeneric';
import styles from '../styles/register.module.scss';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../src/components/common/footer';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import ToastComponent from '../src/components/common/toast';
import authService from '../src/services/authService';
const login=()=>{
    const router=useRouter()
    const [toastColor,setToastColor]=useState('')
    const [toastIsOpen,setToastIsOpen]=useState(false)
    const [toastMessage,setToastMEssage]=useState('')
   useEffect(()=>{
if(sessionStorage.getItem('onebitflix-token')){
    router.push("/home")
}
   },[])
    useEffect(()=>{
        const registerSuccess=router.query.registred
        if(registerSuccess==='true'){
            setToastColor('bg-success')
            setToastIsOpen(true);
            setTimeout(()=>{setToastIsOpen},1000*3)
            setToastMEssage("Cadastro realizado com sucesso!")
        }
    },[router.query])
    const handleLogin=async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const formData= new FormData(event.currentTarget)
        const email=formData.get('email')!.toString()
        const password=formData.get('password')!.toString()
        const params={email,password}

        const {status}=await authService.login(params)
        if(status===200){
            router.push("/home")
        }else{
            setToastMEssage("Email ou senha incorretos!")
            }
        
    }
    return<>
    <Head> 
    <title >Onebitflix</title>
    <link rel="shortcut icon" href="/favicon.svg" type='image/x-icon' />  
    </Head>
     <main className={styles.main}>   
        <HeaderGeneric logoUrl='/' btnContent='Quero fazer parte' btnUrl='/register'/>
        <Container className='py-5'>
            <p className={styles.formTitle}>Bem-vindo de volta!</p>
            <Form className={styles.form} onSubmit={handleLogin}>
                <p className='text-center'>
                    <strong>Bem-vindo ao Onebitflix</strong>
                </p>
                <FormGroup>
                    <Label htmlFor="email" className={styles.label}>E-MAIL</Label>
                    <Input type="email" id='email' name='email' placeholder='Qual o seu email?' className={styles.input} required />
                </FormGroup>
                <FormGroup>
                   <Label htmlFor="password" className={styles.label}>SENHA</Label>
                    <Input type="password" id='password' name='password' placeholder='Qual sua password?' className={styles.input} required />
                </FormGroup>
                <Button type='submit' outline className={styles.formBtn}>
                  Entrar 
                </Button>
            </Form>
            <ToastComponent color={toastColor} isOpen={toastIsOpen} message={toastMessage}/>
     
        </Container>
        <Footer></Footer>
        </main>
    </>
}
export default login