import { FC } from 'react'

type Props = {
  moonbird?: any
}

const MoonbirdRewards: FC<Props> = ({ moonbird }) => {
  const rewards = moonbird?.rewards?.rewards

  return (
    <article className="moonbird-rewards col-span-full rounded-2xl border border-gray-300 bg-white p-6 dark:border-neutral-600 dark:bg-black">

      <h2 className="font-bold text-xl text-content-light-primary dark:text-content-dark-primary mb-8">
        Rewards
      </h2>

      {rewards && rewards.map((reward: any) => (
        <div className={`flex items-center my-4 rewards-row ${reward.redeemed ? 'reward-claimed' : 'reward-unclaimed'}`} key={reward.id}>
          <div className="relative w-20 h-20 mr-6">
            <img src={`https://nest.moonbirds.xyz/images/rewards/${reward.imageUrl}.png`} className="absolute inset-0 rounded-md" alt="" />
          </div>
          <div className="flex-1 mr-6">
            <p className="font-semibold text-lg text-content-light-primary dark:text-content-dark-primary">
              {reward.title}
            </p>
            <p className="reward-desc leading-6 text-[14px] text-content-light-secondary dark:text-content-dark-secondary leading-5">
              {reward.description}
            </p>
          </div>
          <div>
            <p className="award-redeemed font-bold text-sm tracking-wide">
              {reward.redeemed ? 'Claimed' : 'Unclaimed'}
            </p>
          </div>
        </div>
      ))}

    </article>
  )
}

export default MoonbirdRewards
