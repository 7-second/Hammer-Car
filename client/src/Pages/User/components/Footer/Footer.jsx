import React from 'react'
import { FaFacebook, FaTelegram } from 'react-icons/fa6'
import { BsGithub } from 'react-icons/bs'
import { LiaLinkedin } from 'react-icons/lia'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-white h-48 w-full p-5 flex flex-col justify-between'>
      <Logo />
      <div>
        <p className='text-center text__medium'>&copy; All right 2024.</p>
        <div className='flex justify-end w-full border-t border-gray-300 py-2'>
          <ul className='flex gap-3 px-5'>
            <Link to=""><FaFacebook size="30" className='footer__link' /></Link>
            <Link to=""><LiaLinkedin size="30" className='footer__link' /></Link>
            <Link to=""><BsGithub size="30" className='footer__link' /></Link>
            <Link to=""><FaTelegram size="30" className='footer__link' /></Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer