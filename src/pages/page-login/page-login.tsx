import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card'
import { CheckBox } from '@/components/ui/checkBox'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import s from './page-login.module.scss'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/services/auth/auth.servies.ts";
import { PATH } from "@/router.tsx";


const schema = z.object({
  password: z.string().nonempty('Enter password'),
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  rememberMe: z.boolean().optional(),
})

type FormType = z.infer<typeof schema>



export const PageLogin = () => {
  const navigate = useNavigate()
  const {control,register, handleSubmit} = useForm<FormType>(
    {mode: 'onSubmit', resolver: zodResolver(schema), defaultValues: {email: 'lisa15.08patrikeevna@gmail.com', password: '12345', rememberMe: true,},
  })
  // const {data, isLoading} = useMeQuery()
  const [signIn, {isLoading: isSigningIn}] = useLoginMutation()
  // console.log('control', control);

  // if( isLoading ) return <div>Loading...</div>
  // if( data ) return <Navigate to="/"/>

  // const handleSignIn1 = async (data: FormType) => {
  //   console.log(data);
  //  try{
  //    await signIn(data)
  //    navigate('/')
  //   }catch( e ) {
  //    console.log(e);
  //  }
  // }
  const handleSignIn = (data: FormType) => {
    console.log(data);
    signIn(data)
    .unwrap()
    .then(() => {
      navigate('/')
    })
  }

  const handleFormSubmitted = handleSubmit(handleSignIn)

  return (<>
    <DevTool control={control}/>
    <div className={s.wrapperCard}>
      <Card className={s.intoAuthCard}>
        <h1 className={s.h1}>Sign In</h1>
        <form onSubmit={handleFormSubmitted}>
          <Input placeholder={'Email'} label={'Email'} name={'email'} {...register( 'email')} />
          <Input label={'Password'} placeholder={'Password'} type={'password'} name={'password'} {...register( 'password')} />
          <CheckBox label={'Remember me'} {...register('rememberMe')} name={'rememberMe'} position={'left'}/>
          <Button as={Link} to="/recover-password" className={s.link} rel={'noopener nopener'} variant={'link'}>
            Forgot Password?
          </Button>
          <Button className={s.button} variant={'primary'} type={'submit'} disabled={isSigningIn} fullWidth={true}>
            Sign In
          </Button>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button as={NavLink} className={`${s.link} ${s.dontHaveAccount}`} fullWidth={true} to={PATH.signUp} rel={'noopener nopener'} target={'_blank'} variant={'link'}>
            {/*<Button as={NavLink} className={`${s.link} ${s.dontHaveAccount}`} fullWidth={true} to={navigate(PATH.signUp)} rel={'noopener nopener'} target={'_blank'} variant={'link'}>*/}
              Dont have an account?
            </Button>
          </div>
          <div className={s.underlineLinkWrapper}>
            {/*<Button as={'a'} className={s.underlineLink} href={'#'} rel={'noopener nopener'} target={'_blank'} variant={'link'}>*/}
            <Button as={'a'} className={s.underlineLink} href={navigate(PATH.signUp)} rel={'noopener nopener'} target={'_blank'} variant={'link'}>
              Sign Up
            </Button>
          </div>
        </form>
      </Card>
    </div>
  </>)
}

export default PageLogin









