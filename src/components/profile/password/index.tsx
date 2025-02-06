import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/profile.module.scss";
import { FormEvent, useEffect, useState } from "react";
import profileService from "../../../services/profileService";
import ToastComponent from "../../common/toast";
const PasswordForm=()=>{
    const[currentPassword,setCurrentPassword]=useState("")
    const[newPassword,setNewPassword]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")
    const [color,setColor]=useState("")
    const[errorMessage,setErrorMessage]=useState("")  
      const[toast,setToast]=useState(false)
useEffect(()=>{
    profileService.fetchCurrent().then((password)=>{
        setCurrentPassword(password.currentPassword)
        setNewPassword(password.newPassword)
    })
})
const handlePasswordUpadate = async function (event: FormEvent<HTMLFormElement>) {
	event.preventDefault();

	if (newPassword != confirmPassword) {
	  setToast(true);
    setErrorMessage("Senha e confirmação de senha diferentes!");
    setColor("bg-danger");
    setTimeout(() => setToast(false), 1000 * 3);
    
    return;
  }

	if (currentPassword === newPassword) {
	  setToast(true);
    setErrorMessage("Não coloque a nova senha igual a senha antiga!");
    setColor("bg-danger");
    setTimeout(() => setToast(false), 1000 * 3);

    return;
  }
    const res=await profileService.passwordUpdate({
currentPassword,newPassword
    }); 
    if (res === 204) {
        setToast(true);
        setErrorMessage("Senha alterada com sucesso!");
        setColor("bg-success");
        setTimeout(() => setToast(false), 1000 * 3);
  
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    
      if (res === 400) {
        setToast(true);
      setErrorMessage("Senha atual incorreta!");
      setColor("bg-danger");
      setTimeout(() => setToast(false), 1000 * 3);
    }
}
    return <>
    <Form onSubmit={handlePasswordUpadate} className={styles.form}>
        <div className={styles.inputNormalDiv}>
            <FormGroup>
                <Label for="currentPassword" className={styles.label}>SENHA ATUAL</Label>
                <Input name="currentPassword" 
                type="password" 
                id="currentPassword" 
                placeholder="********"
                required
                value={currentPassword}
                onChange={(ev)=>setCurrentPassword(ev.currentTarget.value)}
                minLength={4}
                maxLength={12}
                className={styles.input}/>
            </FormGroup>
        </div>
        <div className={styles.inputFlexDiv}>
            <FormGroup>
                <Label for="newPassword" className={styles.label}>NOVA SENHA</Label>
                <Input name="newPassword"
                type="password"
                id="newPassword"
                placeholder="*********"
                required
                value={newPassword}
                onChange={(ev)=>setNewPassword(ev.currentTarget.value)}
                minLength={6}
                maxLength={12}
                className={styles.inputFlex}/>
            </FormGroup>
            <FormGroup >
                <Label for="confirmNewPassword" className={styles.label}>CONFIRMAR NOVA SENHA</Label>
                <Input name="confirmNewPassword"
                type="password"
                id="confirmNewPassword"
                placeholder="*********"
                required
                value={confirmPassword}
                onChange={(ev)=>setConfirmPassword(ev.currentTarget.value)}
                minLength={6}
                maxLength={12}
                className={styles.inputFlex}/>
            </FormGroup>
           
        </div>
        <Button className={styles.formBtn} outline type="submit">Salvar alterações</Button>
    </Form>
    <ToastComponent color={color} isOpen={toast} message={errorMessage}/>
    </>
}
export default PasswordForm;