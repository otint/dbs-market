import { FC } from 'react'
import Link from 'next/link'
import EthAccount from 'components/EthAccount'
import { TokenDetails } from 'types/reservoir'
import * as Tooltip from '@radix-ui/react-tooltip'
import { FiAlertCircle } from 'react-icons/fi'

type Props = {
  token?: TokenDetails
  moonbird?: any
  bannedOnOpenSea: boolean
}

const TokenHeading: FC<Props> = ({ token, moonbird, bannedOnOpenSea }) => {
  const owner = token?.owner

  return (
    <article className="token-heading col-span-full rounded-2xl border border-gray-300 bg-white p-6 dark:border-neutral-600 dark:bg-black">

      <div className="reservoir-h3 mb-8 flex items-center gap-4 overflow-hidden font-headings dark:text-white">
        {moonbird?.nesting ? (
          <div>Moonbird {token?.name || `#${token?.tokenId}`}</div>
        ) : (
          <div>{token?.name || `#${token?.tokenId}`}</div>
        )}
        {bannedOnOpenSea && (
          <Tooltip.Provider>
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger>
                <FiAlertCircle className="h-6 w-6 text-[#FF3B3B]" />
              </Tooltip.Trigger>
              <Tooltip.Content
                sideOffset={5}
                className="reservoir-body-2 z-[10000] w-[191px] rounded-2xl bg-neutral-800 py-3 px-4 text-center text-white dark:bg-neutral-100 dark:text-black"
              >
                <Tooltip.Arrow className="fill-neutral-800 dark:fill-neutral-100" />
                Token is not tradeable on OpenSea
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        )}
      </div>

      <div className="token-owner">
        <div className="reservoir-h6 mb-2 font-headings dark:text-white">
          Owner
        </div>
        {owner && (
          <Link href={`/address/${owner}`}>
            <a className="inline-block">
              <EthAccount address={owner} side="left" />
            </a>
          </Link>
        )}
      </div>

    </article>
  )
}

export default TokenHeading
