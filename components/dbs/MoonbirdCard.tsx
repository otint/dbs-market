import { FC } from 'react'
import EthAccount from 'components/EthAccount'
import Link from 'next/link'
import { TokenDetails } from 'types/reservoir'
import { formatDistanceToNow, formatDistance, parseISO, format } from 'date-fns'
import * as Tooltip from '@radix-ui/react-tooltip'
import { FiAlertCircle } from 'react-icons/fi'

type Props = {
  token?: TokenDetails
  moonbird?: any
  bannedOnOpenSea: boolean
}

const MoonbirdCard: FC<Props> = ({ token, moonbird, bannedOnOpenSea }) => {
  const owner = token?.owner

  const duration = (s: number) => formatDistance(0, s * 1000, { includeSeconds: true })

  const nests: Array<any> = [
    { name: 'Straw', image: '/icons/nests/Straw.png' },
    { name: 'Bronze', image: '/icons/nests/Bronze.png' },
    { name: 'Silver', image: '/icons/nests/Silver.png' },
    { name: 'Gold', image: '/icons/nests/Gold.png' },
    { name: 'Diamond', image: '/icons/nests/Diamond.png' }
  ]

  const nesting: any = moonbird?.nesting
  const isNested: boolean = nesting?.nested
  const nestName: string = nesting?.nestLevel
  const totalNestIn: string = duration(nesting?.totalDuration)

  // If is nested
  const nest = nests[nests.findIndex(n => n.name === nestName)]
  const nextNest = isNested && nests[nests.findIndex(n => n.name === nestName) + 1]
  const currNestAt = isNested && parseISO(nesting?.currentNestLevelStartedAt)
  const nextNestAt = isNested && parseISO(nesting?.nextNestLevelAt)
  const nextNestIn = nextNestAt && formatDistanceToNow(nextNestAt)
  const duraNestIn = isNested && duration(nesting?.currentDuration)

  return (
    <article className="moonbird-card col-span-full rounded-2xl border border-gray-300 bg-white p-6 dark:border-neutral-600 dark:bg-black">

      <div className="reservoir-h3 mb-8 flex items-center gap-4 overflow-hidden font-headings dark:text-white">
        <div>Moonbird {token?.name || `#${token?.tokenId}`}</div>
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

      <div className="moonbird-owner">
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

      <div className="mb-9 flex items-center justify-between">

        <div className="mt-0 lg:mt-1 lg:mb-1 mr-6">
          <img src={nest.image} width="128" height="128" />
        </div>
        <div className="flex-1 mt-6 lg:mt-0">
          <label className="label label-md text-sm font-bold tracking-wide uppercase leading-6 text-content-light-secondary dark:text-content-dark-secondary">
            Nest Level
          </label>
          <h1 className="font-bold text-2xl text-content-light-primary dark:text-content-dark-primary">
            {nestName} Nest
          </h1>
        </div>

      </div>
      <table className="w-full text-left">
        <caption className="text-left">
          <p className="font-semibold leading-6 text-[14px] text-content-light-primary dark:text-content-dark-primary">
            Nesting Information
          </p>
        </caption>
        <tbody>
          {nesting?.nested && (
            <>
              <tr className="h-7">
                <th>
                  <p className="font-semibold leading-6 text-[14px] text-content-light-secondary dark:text-content-dark-secondary">
                    Nesting Streak 
                  </p>
                </th>
                <td className="lg:w-1/2">
                  <p className="leading-6 text-[14px] text-content-light-primary dark:text-content-dark-primary">
                    {duraNestIn}
                  </p>
                </td>
              </tr>
              <tr className="h-7">
                <th>
                  <p className="font-semibold leading-6 text-[14px] text-content-light-secondary dark:text-content-dark-secondary">
                    {nextNest?.name || 'Next'} Nest in 
                  </p>
                </th>
                <td className="lg:w-1/2">
                  <p className="leading-6 text-[14px] text-content-light-primary dark:text-content-dark-primary">
                    {nextNestIn}
                  </p>
                </td>
              </tr>
              <tr className="h-7">
                <th>
                  <p className="font-semibold leading-6 text-[14px] text-content-light-secondary dark:text-content-dark-secondary">
                    {nestName} Nest achieved on
                  </p>
                </th>
                <td className="lg:w-1/2">
                  <p className="leading-6 text-[14px] text-content-light-primary dark:text-content-dark-primary">
                    {currNestAt && format(currNestAt, 'LLLL do yyyy, h:mm:ss aaa')}
                  </p>
                </td>
              </tr>
            </>
          )}
          <tr className="h-7">
            <th>
              <p className="font-semibold leading-6 text-[14px] text-content-light-secondary dark:text-content-dark-secondary">
                Total lifetime Nesting time
              </p>
            </th>
            <td className="lg:w-1/2">
              <p className="leading-6 text-[14px] text-content-light-primary dark:text-content-dark-primary">
                {totalNestIn}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

    </article>
  )
}

export default MoonbirdCard
