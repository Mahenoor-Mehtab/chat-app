import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import getUsers from '../actions/getUser'
import UserList from './components/UserList'

const UsersLayout = async ({children}: {children: React.ReactNode}) => {
  const users = await getUsers()
  return (
    // ts-expect-error Server Component
    <Sidebar>
      <div className='h-full bg-[#0f0c29]'>
        <UserList items={users}/>
        {children}
      </div>
    </Sidebar>
  )
}

export default UsersLayout