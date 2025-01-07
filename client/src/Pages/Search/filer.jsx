
import React from 'react'

const Filter = ({ type }) => {
    return (
        <div className='flex items-center gap-2'>
            <input type="checkbox" name="" id="" />
            <h5 className=' font-sans font-medium text-sm'>{type}</h5>
            <p className='text__medium'>(10)</p>
        </div>
    )
}

export default Filter