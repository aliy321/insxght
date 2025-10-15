import Image from 'next/image'

export const Logo = () => {
  return <Image src={'/whitelabel/app-icon-512.png'} alt="logo" width={150} height={150} />
}
