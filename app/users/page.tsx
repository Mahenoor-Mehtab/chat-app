"use client"

import EmptyState from "../components/EmptyState"

const Users = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full transition-all duration-500 bg-[#0f0c29]">
      <EmptyState/>
    </div>
  )
}

export default Users