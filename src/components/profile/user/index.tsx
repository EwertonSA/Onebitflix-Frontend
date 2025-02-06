import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/profile.module.scss";
import { FormEvent, useEffect, useState } from "react";
import profileService from "../../../services/profileService";
import ToastComponent from "../../common/toast";
import { useRouter } from "next/router";
const UserForm=()=>{
    const router=useRouter()
    const [color,setColor]=useState("")
    const[errorMessage,setErrorMessage]=useState("")  
      const[toast,setToast]=useState(false)
    const [firstName, setFirstName]=useState("")
    const [lastName, setLastName]=useState("")
    const [phone, setPhone]=useState("")
    const [email, setEmail]=useState("")
    const [initialEmail,setInitialEmail]=useState(email)
    const [created_at, setCreated_at]=useState("")
    const date= new Date(created_at)
    const month=date.toLocaleDateString("default",{month:"long"})
    useEffect(()=>{
      profileService.fetchCurrent().then((user)=>{
        setFirstName(user.firstName);
        setLastName(user.lastName)
        setPhone(user.phone)
        setEmail(user.email)
        setInitialEmail(user.email)
        setCreated_at(user.createdAt)
      })  
    },[])
    const handleUserUpdate= async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const res=await profileService.userUpdate({
            firstName,lastName,phone,email,created_at
        })
        console.log(res)
        if(res===200){
        setToast(true)
        setErrorMessage("Informações alteradas")
        setColor("bg-success")
        setTimeout(()=>setToast(false),3*1000)
        if(email!=initialEmail){
            sessionStorage.clear()
            router.push("/")
        }
        }else{
            setToast(true)
            setErrorMessage("Você não pode mudar para esse email!");
            setColor("bg-danger");
            setTimeout(()=>setToast(false),3*1000)
        }
        }

    return<>
    <Form onSubmit={handleUserUpdate} className={styles.form}>
        <div className={styles.formName}>
            <p className={styles.nameAbbreviation}>{firstName.slice(0,1)}{lastName.slice(0,1)}</p>
            <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
        </div>
        <div className={styles.memberTime}>
            <img src="/profile/iconUserAccount.svg" 
            alt="iconProfile" 
            className={styles.memberTimeImg}/>
            <p className={styles.memberTimeText}>Membro desde <br/>
            {`${date.getDate()} de ${month} de ${date.getFullYear()}`}</p>
        </div>
        <hr/>
        <div className={styles.inputFlexDiv}>
        <FormGroup >
            <Label for="firstName" className={styles.label}> 
NOME
            </Label>
            <Input name="firstName" type="text" id="firstName" placeholder="Qual o seu primeiro nome" required
            maxLength={20} className={styles.inputFlex} value={firstName} 
            onChange={(event)=>{setFirstName(event.target.value)}}/>
        </FormGroup> 
        <FormGroup>
            <Label for="lastName" className={styles.label}>
                SOBRENOME
            </Label>
            <Input name="lastName" type="text" id="lastName" placeholder="Qual o seu último nome" required
            maxLength={20} className={styles.inputFlex} value={lastName}  onChange={(event)=>{setLastName(event.target.value)}}/>
        </FormGroup> 
        </div>
        <div className={styles.inputNormalDiv}>
	<FormGroup>
	  <Label className={styles.label} for="phone">
	    WHATSAPP / TELEGRAM
    </Label>
    <Input
    name="phone"
    type="tel"
    id="phone"
    placeholder="(xx) 9xxxx-xxxx"
    required
    className={styles.input}
    value={"+55 (21) 99999-9999"}
    />
  </FormGroup>
  <FormGroup>
	  <Label className={styles.label} for="email">
	    E-MAIL
    </Label>
    <Input
    name="email"
    type="email"
    id="email"
    placeholder="Coloque o seu email"
    required
    className={styles.input}
    value={"testeemail@gmail.com"}
    />
  </FormGroup>

  <Button className={styles.formBtn} outline>
	  Salvar Alterações
  </Button>
</div>
    </Form>
    <ToastComponent color={color} isOpen={toast} message={errorMessage}/>
    </>
}
export default UserForm