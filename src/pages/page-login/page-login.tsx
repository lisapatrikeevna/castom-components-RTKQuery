import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card'
import { CheckBox } from '@/components/ui/checkBox'
import { Input } from '@/components/ui/input'

import s from './page-login.module.scss'

export const PageLogin = () => {
  const linkHref = 'https://www.google.com/'

  return (
    <div className={s.wrapperCard}>
      <Card className={s.intoAuthCard}>
        <h1 className={s.h1}>Sign In</h1>
        <form>
          <Input label={'Email'} />
          <Input label={'Password'} type={'password'} />
          <CheckBox label={'Remember me'} />
          <Button
            as={'a'}
            className={s.link}
            href={linkHref}
            rel={'noopener nopener'}
            target={'_blank'}
            variant={'link'}
          >
            Forgot Password?
          </Button>
          <Button className={s.button} variant={'primary'}>
            Sign In
          </Button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              as={'a'}
              className={`${s.link} ${s.dontHaveAccount}`}
              href={linkHref}
              rel={'noopener nopener'}
              target={'_blank'}
              variant={'link'}
            >
              Dont have an account?
            </Button>
          </div>
          <div className={s.underlineLinkWrapper}>
            <Button
              as={'a'}
              className={s.underlineLink}
              href={linkHref}
              rel={'noopener nopener'}
              target={'_blank'}
              variant={'link'}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default PageLogin
