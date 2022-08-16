import { FC } from 'react'
import FormatEth from 'components/FormatEth'
import { formatNumber } from 'lib/numbers'
import FormatWEth from 'components/FormatWEth'

type Props = {
  count: number
  topOffer: number | undefined
  floor: number | undefined
  allTime: number | undefined
  volumeChange: number | undefined
  floorChange: number | undefined
}

const HeroStats: FC<{ stats: Props }> = ({ stats }) => {
  return (
    <div className="grid min-w-full grid-cols-2 items-center gap-[91px] overflow-hidden bg-gray-300 dark:border-[#525252] dark:bg-[#232149] md:m-0 md:h-[40px] md:min-w-[553px] md:grid-cols-4 md:bg-white dark:md:bg-[#232149]">
      <Stat name="items">
        <h3 className="reservoir-h6 flex justify-center dark:text-white font-[Poppins] font-bold h-[20px] text-[#232149]">
          {formatNumber(stats.count)}
        </h3>
      </Stat>
      <Stat name="top offer">
        <h3 className="reservoir-h6 flex justify-center dark:text-white font-[Poppins] font-bold h-[20px] text-[#232149]">
          <FormatEth amount={stats.topOffer} />
        </h3>
      </Stat>
      <Stat name="floor">
        <h3 className="reservoir-h6 flex justify-center gap-1 dark:text-white font-[Poppins] font-bold h-[20px] text-[#232149]">
          <FormatEth amount={stats.floor} maximumFractionDigits={2} />
          <PercentageChange value={stats.floorChange} />
        </h3>
      </Stat>
      <Stat name="total volume">
        <h3 className="reservoir-h6 flex justify-center gap-1 dark:text-white font-[Poppins] font-bold h-[20px] text-[#232149]">
          <FormatEth amount={stats.allTime} maximumFractionDigits={2} />
          <PercentageChange value={stats.volumeChange} />
        </h3>
      </Stat>
    </div>
  )
}

const Stat: FC<{ name: string }> = ({ name, children }) => (
  <div className="flex flex-col justify-center bg-white dark:bg-[#232149]">
    {children}
    <p className="h-[20px] flex justify-center text-[#232149] text-[12px] dark:text-white">{name}</p>
  </div>
)

export const PercentageChange: FC<{ value: number | undefined | null }> = ({
  value,
}) => {
  if (value === undefined || value === null) return null

  const percentage = (value - 1) * 100

  if (percentage > 100 || value === 0) {
    return null
  }

  if (value < 1) {
    return (
      <div className="text-[12px] font-[Poppins] text-[#FF3B3B]">{formatNumber(percentage)}%</div>
    )
  }

  if (value > 1) {
    return (
      <div className="text-[12px] font-[Poppins] text-[#06C270]">+{formatNumber(percentage)}%</div>
    )
  }

  return null
}

export default HeroStats
