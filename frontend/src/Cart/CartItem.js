import React from 'react'
import { IconButton } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const CartItem = () => {
    return (
        <div className='p-5 shadow-lg border rounded-md'>
        
            <div className='flex items-center'>

                <div className='w-[5rem] h-[5rem]'>
                    <img className='w-full h-full object-cover' src='https://images.unsplash.com/photo-1612838320302-4'
                    alt='product' />
                </div>
                    
                <div className='ml-5 space-y-1'>
            
                    <p className='font-semibold'>Product Name</p>
                    <p className='opacity-70'>Size: L,white</p>
                    <p className='opacity-70 mt-2'>Quantity: 1</p>

                    <div className='flex space-x-5 items-center  text-gray-900 pt-6'>
                        <p className="font-semibold">Rs.999</p>
                        <p className="opacity-50 line-through">Rs.1199</p>
                        <p className="text-green-600 font-semibold"> 20% off</p>
                    </div>
                
                </div>

                <div className='lg:flex items-center lg:space-x10 pt-4'>

                    <div className='flex items-center space-x-2'>
                        <IconButton>
                            <RemoveCircleOutlineIcon/>
                        </IconButton>

                        <span className='py-1 px-7 border rounded-sm'>
                        <IconButton>
                            <AddCircleOutlineIcon/>
                        </IconButton>

                        </span>

                    </div>

                </div>


            
            </div>

        </div>
    )
}

export default CartItem