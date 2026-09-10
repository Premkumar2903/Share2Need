import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";
import { Mail, Phone} from "lucide-react";


export default function Footer() {
  return (
        <div className='bg-black py-5'>
            <div id="Contact" className="flex flex-col sm:flex-row sm:justify-between max-w-290 mx-auto p-3 bg-black text-gray-300 contact">
                <div>
                    <p>Developed by</p>
                    <p className="text-xl text-amber-100">Premkumar</p>
                    

                    <div className="pt-2">
                        <a className='hover:!text-gray-50' href="https://www.linkedin.com/in/premkumar-m-700b851b3/">
                            <FontAwesomeIcon className="pr-2" icon={faLinkedin}/>
                        </a>
                        <a className='hover:!text-gray-50' href="http://wa.me/+916382721836">
                            <FontAwesomeIcon className="pr-2" icon={faWhatsapp} />
                        </a>
                        <a className='hover:!text-gray-50' href="http://https://github.com/Premkumar2903">
                            <FontAwesomeIcon icon={faGithub}/>
                        </a>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col pt-2 sm:pt-0">
                    <p className="text-base  md:w-90 sm:w-80 sm:pt pb-2">
                        Hi! i'm Open for full-time roles, freelance projects or Collaborative works.
                    </p>
                        <a className="!text-sky-200 hover:!text-sky-300" href="mailto:prem29makendran@gmail.com"> <Mail size={15}  className="inline-block mr-2"/>prem29mahendran@gmail.com</a>
                        <a className="!text-sky-200 hover:!text-sky-300" href='https://wa.me/+916382721836' ><Phone size={15} className="inline-block mr-2"/>+91 6382721836</a>
                    </div>
                </div>   
            </div>
        </div>
        
  )
}
