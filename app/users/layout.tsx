import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'

const UsersLayout = async ({children}: {children: React.ReactNode}) => {
  return (
    // ts-expect-error Server Component
    <Sidebar>
      <div className='h-full bg-[#0f0c29]'>
        {children}
      </div>
    </Sidebar>
  )
}

export default UsersLayout