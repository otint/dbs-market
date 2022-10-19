import { FC } from 'react'
import EthAccount from 'components/EthAccount'
import Link from 'next/link'
import { TokenDetails } from 'types/reservoir'
import { formatDistanceToNow, formatDistance, parseISO, format } from 'date-fns'

type Props = {
  token?: TokenDetails
  moonbird?: Object
}

const MoonbirdCard: FC<Props> = ({ token, moonbird }) => {
  const owner =
    token?.kind === 'erc1155' && details?.market?.floorAsk?.maker
      ? details?.market?.floorAsk?.maker
      : token?.owner

  const duration = (s) => formatDistance(0, s * 1000, { includeSeconds: true })

  const nests: array = [
    { name: 'Straw', image: '/icons/nests/Straw.png' },
    { name: 'Bronze', image: '/icons/nests/Bronze.png' },
    { name: 'Silver', image: '/icons/nests/Silver.png' },
    { name: 'Gold', image: '/icons/nests/Gold.png' },
    { name: 'Diamond', image: '/icons/nests/Diamond.png' }
  ]

  const nesting: Object = moonbird?.nesting
  const isNested: boolean = nesting?.nested
  const nestName: string = nesting?.nestLevel
  const totalNestIn: string = duration(nesting?.totalDuration)

  // If is nested
  const nest: Object = nests[nests.findIndex(n => n.name === nestName)]
  const nextNest: string = isNested && nests[nests.findIndex(n => n.name === nestName) + 1]
  const currNestAt: Date = isNested && parseISO(nesting?.currentNestLevelStartedAt)
  const nextNestAt: Date = isNested && parseISO(nesting?.nextNestLevelAt)
  const nextNestIn: string = isNested && formatDistanceToNow(nextNestAt, { roundingMethod: 'ceil' })
  const duraNestIn: string = isNested && duration(nesting?.currentDuration)

  return (
    <article className="moonbird-card col-span-full rounded-2xl border border-gray-300 bg-white p-6 dark:border-neutral-600 dark:bg-black">

      <div className="reservoir-h3 mb-8 flex items-center gap-4 overflow-hidden font-headings dark:text-white">
        <div>Moonbird {token?.name || `#${token?.tokenId}`}</div>
      </div>

      <div class="moonbird-owner">
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

        <div class="mt-0 lg:mt-1 lg:mb-1 mr-6">
          <img src={nest.image} width="128" height="128" />
        </div>
        <div class="flex-1 mt-6 lg:mt-0">
          <label class="label label-md text-sm font-bold tracking-wide uppercase leading-6 text-content-light-secondary dark:text-content-dark-secondary">
            Nest Level
          </label>
          <h1 class="font-bold text-2xl text-content-light-primary dark:text-content-dark-primary">
            {nestName} Nest
          </h1>
        </div>

      </div>
      <table class="w-full text-left">
        <caption class="text-left">
          <p class="font-semibold leading-6 text-[14px] text-content-light-primary dark:text-content-dark-primary">
            Nesting Information
          </p>
        </caption>
        <tbody>
          {nesting?.nested && (
            <>
              <tr class="h-7">
                <th>
                  <p class="font-semibold leading-6 text-[14px] text-content-light-secondary dark:text-content-dark-secondary">
                    Nesting Streak 
                  </p>
                </th>
                <td class="lg:w-1/2">
                  <p class="leading-6 text-[14px] text-content-light-primary dark:text-content-dark-primary">
                    {duraNestIn}
                  </p>
                </td>
              </tr>
              <tr class="h-7">
                <th>
                  <p class="font-semibold leading-6 text-[14px] text-content-light-secondary dark:text-content-dark-secondary">
                    {nextNest?.name || 'Next'} Nest in 
                  </p>
                </th>
                <td class="lg:w-1/2">
                  <p class="leading-6 text-[14px] text-content-light-primary dark:text-content-dark-primary">
                    {nextNestIn}
                  </p>
                </td>
              </tr>
              <tr class="h-7">
                <th>
                  <p class="font-semibold leading-6 text-[14px] text-content-light-secondary dark:text-content-dark-secondary">
                    {nestName} Nest achieved on
                  </p>
                </th>
                <td class="lg:w-1/2">
                  <p class="leading-6 text-[14px] text-content-light-primary dark:text-content-dark-primary">
                    {format(currNestAt, 'LLLL do yyyy, h:mm:ss aaa')}
                  </p>
                </td>
              </tr>
            </>
          )}
          <tr class="h-7">
            <th>
              <p class="font-semibold leading-6 text-[14px] text-content-light-secondary dark:text-content-dark-secondary">
                Total lifetime Nesting time
              </p>
            </th>
            <td class="lg:w-1/2">
              <p class="leading-6 text-[14px] text-content-light-primary dark:text-content-dark-primary">
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
