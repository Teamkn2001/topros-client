import React, { useCallback, useEffect, useState } from 'react'
import ItemCard from '../../components/kit/ItemCard'
import AddItemModal from '../../components/kit/AddItemModal'
import EditItemModal from '../../components/kit/EditItemModal'
import { getUserItems } from '../../api/user'

export default function UserPage() {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [items, setItems] = useState([])

  const fetchUserData = useCallback(async () => {
    try {
      // fetch user data
      const artistItems = await getUserItems()
      setItems(artistItems.data.data)
    } catch (error) {
      const errMsg = error?.response?.data?.msg || error.message
      console.log(errMsg)
    }
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  return (
    <div className='mx-[7%]  flex flex-col justify-center items-center'>

      <button className="btn btn-outline btn-success m-4" onClick={() => setIsAddModalOpen(!isAddModalOpen)}>Add image +++</button>
      <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={fetchUserData}/>

      <div className='flex flex-wrap gap-4 justify-center items-center'>
        {items.map((item, index) => (
          <div onClick={() => {setIsEditModalOpen(true), setSelectedItem(item)}} key={index}>
            <ItemCard  imgUrl={item. artImg} />
          </div>
        ))}
      </div>
      <EditItemModal isOpen={isEditModalOpen} item={selectedItem} onClose={() => setIsEditModalOpen(false)} onSuccess={fetchUserData}/>
    </div>
  )
}
