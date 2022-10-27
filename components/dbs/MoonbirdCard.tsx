import { FC } from 'react'
import { TokenDetails } from 'types/reservoir'
import { formatDistanceToNow, formatDistance, parseISO, format } from 'date-fns'

type Props = {
  token?: TokenDetails
  moonbird?: any
}

const MoonbirdCard: FC<Props> = ({ token, moonbird }) => {
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
