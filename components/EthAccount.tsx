import { truncateAddress, truncateEns } from 'lib/truncateText'
import { FC } from 'react'
import Avatar from './Avatar'

type Props = {
  address: string | undefined
  ens?: {
    avatar: string | null | undefined
    name: string | null | undefined
  }
  title?: string
  side?: 'left' | 'right'
  hideIcon?: boolean
  classes?: string
}

const EthAccount: FC<Props> = ({
  address,
  ens,
  title,
  side = 'right',
  hideIcon,
  classes,
}) => {
  const icon = !hideIcon && <Avatar address={address} avatar={ens?.avatar} />

  return (
    <div className="flex items-center gap-2">
      {title && (
        <p
          className={`${
            !classes
              ? 'capitalize text-[#5568FE] text-gray-400 dark:text-white'
              : classes
          }`}
        >
          {title}
        </p>
      )}
      {/* {side === 'left' && icon} */}
      {ens?.name ? (
        <div
          title={address}
          className={`${!classes ? 'dark:text-white' : classes}`}
        >
          {truncateEns(ens.name)}
        </div>
      ) : (
        <div
          className={`${
            !classes
              ? 'block whitespace-nowrap font-mono text-[#5568FE] dark:text-white'
              : classes
          }`}
          title={address}
        >
          {truncateAddress(address || '')}
        </div>
      )}
      {side === 'right' && icon}
    </div>
  )
}

export default EthAccount
