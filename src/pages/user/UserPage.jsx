import React, { useEffect, useState } from 'react'
import ItemCard from '../../components/kit/ItemCard'
import AddItemModal from '../../components/kit/AddItemModal'
import EditItemModal from '../../components/kit/EditItemModal'

export default function UserPage() {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    // fetch user data
  }, [])

  return (
    <div className='mx-[7%]  flex flex-col justify-center items-center'>
      <button className="btn btn-outline btn-success m-4" onClick={() => setIsAddModalOpen(!isAddModalOpen)}>Add image +++</button>
      <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <div className='flex flex-wrap gap-4 justify-center items-center' onClick={() => setIsEditModalOpen(!isEditModalOpen)}>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
      <EditItemModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  )
}
