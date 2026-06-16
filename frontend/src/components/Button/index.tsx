import { Buttons, ButtonLink } from './styles'
import { ReactNode } from 'react'

type Props = {
  type: 'button' | 'link' | 'submit'
  title: string
  to?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  icon?: string | ReactNode
  iconAlt?: string
  iconClassName?: string
}

const Botao = ({
  type,
  title,
  to,
  onClick,
  children,
  className,
  icon,
  iconAlt,
  iconClassName
}: Props) => {
  if (type === 'button' || type === 'submit') {
    return (
      <Buttons
        type={type}
        title={title}
        onClick={onClick}
        className={className}
      >
        {icon &&
          (typeof icon === 'string' ? (
            <img
              src={icon}
              alt={iconAlt || ''}
              className={iconClassName}
              style={{ width: 18, marginRight: 6 }}
            />
          ) : (
            icon
          ))}
        {children}
      </Buttons>
    )
  }

  return (
    <ButtonLink to={to as string} title={title} className={className}>
      {icon &&
        (typeof icon === 'string' ? (
          <img
            src={icon}
            alt={iconAlt || ''}
            className={iconClassName}
            style={{ width: 18, marginRight: 6 }}
          />
        ) : (
          icon
        ))}
      {children}
    </ButtonLink>
  )
}

export default Botao
