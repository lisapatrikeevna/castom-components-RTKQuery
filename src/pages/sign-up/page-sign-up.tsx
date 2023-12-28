import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card'
import { Input } from '@/components/ui/input'

import s from './page-sign-up.module.scss'

export const PageSignUp = () => {
  const linkHref = 'https://www.google.com/'

  return (
    <div className={s.wrapperCard}>
      <Card className={s.intoAuthCard}>
        <h1 className={s.h1}>Sign Up</h1>
        <form style={{ width: '100%' }}>
          <ul className={s.ul}>
            <li className={s.li}>
              <Input label={'Email'} />
            </li>
            <li className={s.li}>
              <Input label={'Password'} type={'password'} />
            </li>
            <li className={s.li}>
              <Input label={'Confirm Password'} type={'password'} />
            </li>
          </ul>
          <Button className={s.button} variant={'primary'}>
            Sign Up
          </Button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              as={'a'}
              className={`${s.link} ${s.alreadyHaveAccount}`}
              href={linkHref}
              rel={'noopener nopener'}
              target={'_blank'}
              variant={'link'}
            >
              Already have an account?
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
              Sign In
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default PageSignUp
