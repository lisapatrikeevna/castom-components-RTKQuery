import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card'
import { Input } from '@/components/ui/input'

import s from './page-sign-up.module.scss'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { PATH } from "@/router.tsx";
import { z, ZodError } from 'zod'
import { useSignUpMutation } from "@/services/auth/auth.servies.ts";


const schema = z
.object({
  password: z.string().nonempty('Enter password'),
  passwordConfirmation: z.string().nonempty('Confirm your password'),
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  username: z.string().optional(),
})
.superRefine((data, ctx) => {
  if (data.password !== data.passwordConfirmation) {
    ctx.addIssue({
      message: 'Passwords do not match',
      code: z.ZodIssueCode.custom,
      path: ['passwordConfirmation'],
    })
  }

  return data
})

type FormType = z.infer<typeof schema>



export const PageSignUp = () => {

  const navigate = useNavigate()
  const { register, control, handleSubmit, setError, formState: { errors } } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      username:'',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const [signUp, { isError }] = useSignUpMutation();

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const body={
      email: data.email,
      name: data.username ? data.username:data.email,
      password: data.password,
      // sendConfirmationEmail?: boolean,
      // subject?: string,
    }
    try {
      const response = await signUp(body)
      navigate('/')
      console.log(response);
    } catch (error) {
      if (error instanceof ZodError) {
        // Обработка ошибок валидации от Zod
        error.errors.forEach((validationError) => {
          setError(validationError.path[0] as keyof FormType, {
            type: 'manual',
            message: validationError.message,
          });
        });
      } else {
        // Обработка других типов ошибок
        console.error('Unexpected error:', error);
      }
    }
  };

  //
  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   signUp(data).unwrap().then(() => {navigate('/')})
  // }
  const handleFormSubmitted = handleSubmit(data => onSubmit(data)
    // onSubmit(data, ['passwordConfirmation'])
  )

  return ( <>
    <DevTool control={control} />
    <div className={s.wrapperCard}>
      <Card className={s.intoAuthCard}>
        <h1 className={s.h1}>Sign Up</h1>
        <form style={{ width: '100%' }} onSubmit={handleFormSubmitted}>
          <ul className={s.ul}>
            <li className={s.li}>
              <Input label="Username" name="username" type="text" placeholder="Enter your username" {...register('username')}/>
              {errors.username && <p>{errors.username.message}</p>}
            </li>
            <li className={s.li}>
              <Input label="Email" name="email" type="email" placeholder="Enter your email" {...register( 'email')} />
              {errors.email && <p>{errors.email.message}</p>}

            </li>
            <li className={s.li}>
              <Input label="Password" name="password" type="password" placeholder="Enter your password" {...register('password')}/>
              {errors.password && <p>{errors.password.message}</p>}
            </li>
            <li className={s.li}>
              <Input {...register('passwordConfirmation')} label={'Confirm Password'} type={'password'} />
            </li>
          </ul>
          <Button className={s.button} variant={'primary'} type="submit" fullWidth={true}>
            Sign Up
          </Button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button as={'a'} className={`${s.link} ${s.alreadyHaveAccount}`} href={navigate(PATH.login)} rel={'noopener nopener'}  variant={'link'}>
              Already have an account?
            </Button>
          </div>
          <div className={s.underlineLinkWrapper}>
            <Button as={NavLink} className={s.underlineLink} to={navigate(PATH.login)} rel={'noopener nopener'} target={'_blank'} variant={'link'}>
              Sign In
            </Button>
          </div>
        </form>
      </Card>
    </div>
    </>)


  // return   <>
  //   <DevTool control={control} />
  //   <div className={s.wrapperCard}>
  //     <Card className={s.intoAuthCard}>
  //       <h1 className={s.h1}>Sign Up</h1>
  //       <form style={{ width: '100%' }} onSubmit={handleFormSubmitted}>
  //         <ul className={s.ul}>
  //           {/* ... (остальные поля ввода) */}
  //
  //           <li className={s.li}>
  //             <Input label={'Confirm Password'} type={'password'} name="passwordConfirmation"  control={control} ref={register({ required: 'Confirm Password is required' })} />
  //             {errors.passwordConfirmation && <p>{errors.passwordConfirmation.message}</p>}
  //           </li>
  //         </ul>
  //         <Button className={s.button} variant={'primary'} type="submit">
  //           Sign Up
  //         </Button>
  //         <div style={{ display: 'flex', justifyContent: 'center' }}>
  //           <Button as={Link} className={`${s.link} ${s.alreadyHaveAccount}`} to={PATH.login} rel={'noopener nopener'} target={'_blank'} variant={'link'}>
  //             Already have an account?
  //           </Button>
  //         </div>
  //         <div className={s.underlineLinkWrapper}>
  //           <Button as={Link} className={s.underlineLink} to={PATH.login} rel={'noopener nopener'} target={'_blank'} variant={'link'}>
  //             Sign In
  //           </Button>
  //         </div>
  //       </form>
  //     </Card>
  //   </div>
  // </>
}

export default PageSignUp
