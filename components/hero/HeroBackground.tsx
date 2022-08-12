import { optimizeImage } from 'lib/optmizeImage'
import { FC } from 'react'

const envBannerImage = process.env.NEXT_PUBLIC_BANNER_IMAGE
const envBannerImageDisabled = process.env.NEXT_PUBLIC_DISABLE_COLLECTION_BG

type Props = {
  banner: string | undefined
}

const HeroBackground: FC<Props> = ({ banner, children }) => {
  const bannerImage = envBannerImageDisabled
    ? null
    : optimizeImage(envBannerImage || banner, 1500)
  const baseClasses = `relative z-0 pr-[25px] pl-[61px] flex flex-col items-center col-span-full w-full`

  // return bannerImage ?
  return (
    <div className={baseClasses}>
      {children}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div
          className="absolute inset-0 h-[163px] bg-cover bg-center"
          style={bannerImage ? {
            backgroundImage: `url(${bannerImage})`,
          } : {backgroundColor: '#ddd'}}
        />
      </div>
      <div className="absolute inset-0 z-0" />
    </div>
  )
  // : (
  //   <div className={`${baseClasses} bg-white dark:bg-black`}>{children}</div>
  // )
}

export default HeroBackground
