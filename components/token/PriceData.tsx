import AcceptOffer from 'components/AcceptOffer'
import BuyNow from 'components/BuyNow'
import CancelListing from 'components/CancelListing'
import CancelOffer from 'components/CancelOffer'
import FormatEth from 'components/FormatEth'
import FormatWEth from 'components/FormatWEth'
import ListModal from 'components/ListModal'
import TokenOfferModal from 'components/TokenOfferModal'
import useCollection from 'hooks/useCollection'
import useDetails from 'hooks/useDetails'
import React, { FC, ReactNode } from 'react'
import { useAccount, useNetwork, useSigner } from 'wagmi'
import { setToast } from './setToast'

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const SOURCE_ID = process.env.NEXT_PUBLIC_SOURCE_ID
const NAVBAR_LOGO = process.env.NEXT_PUBLIC_NAVBAR_LOGO
const SOURCE_ICON = process.env.NEXT_PUBLIC_SOURCE_ICON

type Props = {
  details: ReturnType<typeof useDetails>
  collection: ReturnType<typeof useCollection>
}

const PriceData: FC<Props> = ({ details, collection }) => {
  const accountData = useAccount()
  const { data: signer } = useSigner()
  const { chain: activeChain } = useNetwork()

  const token = details.data?.tokens?.[0]

  const sourceName = token?.market?.floorAsk?.source?.name as string | undefined

  const isLocalListed =
    typeof SOURCE_ID === 'string' &&
    typeof sourceName === 'string' &&
    SOURCE_ID === sourceName

  const sourceLogo = isLocalListed
    ? SOURCE_ICON || NAVBAR_LOGO
    : `https://api.reservoir.tools/redirect/logo/v1?source=${sourceName}`

  const sourceRedirect = `https://api.reservoir.tools/redirect/token/v1?source=${sourceName}&token=${token?.token?.contract}:${token?.token?.tokenId}`

  if (!CHAIN_ID) return null

  const isOwner =
    token?.token?.owner?.toLowerCase() === accountData?.address?.toLowerCase()
  const isTopBidder =
    !!accountData &&
    token?.market?.topBid?.maker?.toLowerCase() ===
      accountData?.address?.toLowerCase()
  const isListed = token?.market?.floorAsk?.price !== null
  const isInTheWrongNetwork = Boolean(signer && activeChain?.id !== +CHAIN_ID)

  return (
    <div className="col-span-full md:col-span-4 lg:col-span-5 lg:col-start-2">
      <article className="rounded-[4px] border border-gray-200 bg-white dark:border-neutral-600 dark:bg-black">
        <div className="flex flex-col gap-6 m-5">
          <div className='grid grid-cols-6 gap-6'>
            <Price
              title="List Price"
              source={
                sourceName && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={sourceRedirect}
                    className="reservoir-body flex items-center gap-2 dark:text-white"
                  >
                    on {sourceName}
                    <img className="h-6 w-6" src={sourceLogo} alt="Source Logo" />
                  </a>
                )
              }
              price={
                <FormatEth
                  amount={token?.market?.floorAsk?.price}
                  logoWidth={8}
                />
              }
            />
            <Price
              title="Top Offer"
              price={
                <FormatEth
                  amount={token?.market?.topBid?.value}
                  logoWidth={8}
                />
              }
            />
          </div>
          <div className="flex">
            {isOwner && (
              <ListModal
                data={{
                  collection: collection.data,
                  details,
                }}
                isInTheWrongNetwork={isInTheWrongNetwork}
                maker={accountData?.address}
                setToast={setToast}
                signer={signer}
              />
            )}
            <BuyNow
              data={{
                collection: collection.data,
                details,
              }}
              signer={signer}
              isInTheWrongNetwork={isInTheWrongNetwork}
              setToast={setToast}
              show={!isOwner}
            />
            <AcceptOffer
              data={{
                collection: collection.data,
                details,
              }}
              isInTheWrongNetwork={isInTheWrongNetwork}
              setToast={setToast}
              show={isOwner}
              signer={signer}
            />
            {!isOwner && (
              <TokenOfferModal
                signer={signer}
                data={{
                  collection: collection.data,
                  details,
                }}
                royalties={{
                  bps: collection.data?.collection?.royalties?.bps,
                  recipient: collection.data?.collection?.royalties?.recipient,
                }}
                env={{
                  chainId: +CHAIN_ID as ChainId,
                }}
                setToast={setToast}
              />
            )}
          </div>
        </div>
        
        <div
          className={`${
            (isOwner && isListed) || isTopBidder ? 'mt-6' : ''
          } flex justify-center border-t-[1px] border-gray border-top py-2 font-[Poppins]`}
        >
          <CancelOffer
            data={{
              collection: collection.data,
              details,
            }}
            signer={signer}
            show={isTopBidder}
            isInTheWrongNetwork={isInTheWrongNetwork}
            setToast={setToast}
          />
          <CancelListing
            data={{
              collection: collection.data,
              details,
            }}
            signer={signer}
            show={isOwner && isListed}
            isInTheWrongNetwork={isInTheWrongNetwork}
            setToast={setToast}
          />
        </div>
      </article>
    </div>
  )
}

export default PriceData

const Price: FC<{ title: string; price: ReactNode; source?: ReactNode }> = ({
  title,
  price,
  source,
}) => (
  <div className="space-y-[5px]">
    <div className="flex-grow">
      <div className="font-headings font-light text-[12px] dark:text-white">{title}</div>
      {/* {source} */}
    </div>
    <div className="reservoir-h3 font-headings m-0 text-[14px] dark:text-white">{price}</div>
  </div>
)
