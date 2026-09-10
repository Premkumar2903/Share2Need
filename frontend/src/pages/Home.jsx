import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/home.css'
import Footer from '../components/Footer';


export default function Home() {

  const { isLoggedIn, user, logout } = useAuth();

  
  return (
    <main className='home'>

        <section className='hero'>
            <video 
            className='hero-video'
              autoPlay
              loop
              muted
              playsInline
            >
              <source 
                src='/heartCover.mp4'
                type='video/mp4'
              />
            </video>

          <div className='hero-overlay'></div>

          <div className='hero-content'>

            <h1>Share2Need</h1>

            <h2>
                Share Surplus.
                <br />
                Feed Someone.
            </h2>
            <p>Food Rescue Platform</p>

            <p>
                Rescue and donate surplur food. Feed someone in need.
            </p>

            <p>Share extra food with people nearby instead of letting it go waste.</p>

            {!isLoggedIn &&
              <Link to = "/register">
                  Get Started
              </Link>
            }
            
          </div>
          
         
            
       </section> 

       <Footer/>
    </main>
     
  )
}
