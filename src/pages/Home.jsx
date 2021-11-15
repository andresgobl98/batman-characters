import React, { useState, useEffect, Fragment } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import SwiperCore, {
  Pagination,
  Navigation
} from 'swiper'

import BatmanLogo from '../assets/Batman-Logo.png'

import 'swiper/swiper-bundle.min.css'
import "swiper/swiper.min.css"
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/pagination/pagination.min.css'

SwiperCore.use([Pagination, Navigation]);

const Home = ({characters, loading}) => {
  const [chars, setChars] = useState()
  const [currentChar, setCurrentChar] = useState()
  const [selectedChar, setSelectedChar] = useState()

  useEffect(() => {
    if (characters.length) {
      setChars(characters)
      setCurrentChar(characters[0].image.url)
    }
  }, [characters])

  const selectCard = (character) => {
    const newChars = chars.map(char => char.id === character.id ? {...char, selected: true} : char)
    setChars(newChars)
    setSelectedChar(character)
  }

  const goBack = () => {
    setCurrentChar("")
    setSelectedChar(undefined)
  }

  return (
    <Fragment>
      {loading ? 
        <div className="home flex justify-center items-center">
          <span className="spinner h-20 w-20 rounded-full flex justify-center items-center">
            <img src={BatmanLogo} alt="" />
          </span>
        </div>
        :
        <div className="home flex flex-col-reverse justify-end lg:flex-row lg:justify-center items-center">
          {selectedChar &&
            <button
              className="absolute top-10 md:top-20 left-16 md:left-24 lg:left-40 text-white mb-3"
              onClick={() => goBack()}
            >
              Return
            </button>
          }
          {selectedChar ?
            <CharacterBio character={selectedChar} goBack={goBack} />
            :
            <CharacterGallery chars={chars} selectCard={selectCard} setCurrentChar={setCurrentChar} />
          }
          <div className={`char-image mb-3 lg:mb-0 flex justify-center lg:ml-3 lg:w-2/3`}>
            <img src={selectedChar ? selectedChar.image.url : currentChar} alt="" />
          </div>
        </div>
      }
    </Fragment>
  )
}

export default Home

const CharacterBio = ({character, goBack}) => {
  const [char, setChar] = useState()

  useEffect(() => {
    if (character) {
      setChar(character)
    }
  }, [character])

  return (
    <div className="char-bio md:w-2/3 p-5 border-solid border-2 rounded-md border-white w-full">
      <ul className="text-white text-xs flex flex-col gap-3">
        {char?.biography &&
          Object.entries(char.biography).length &&
          Object.entries(char.biography).map((att, i) => (
          <li key={i} className="flex justify-between">
            <span>{att[0]}:</span><span>{att[1]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const CharacterGallery = ({chars, selectCard, setCurrentChar}) => {
  const [ viewportWidth, setViewportWidth ] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth])

  const handleWindowResize = () => {
    setViewportWidth( window.innerWidth )
  }

  return (
    <Fragment>
      {viewportWidth <= 1024 ? 
        <div className="card-container w-full">
          <Swiper 
            slidesPerView={3} 
            spaceBetween={0} 
            className="mySwiper"
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 4,
                spaceBetween:30
              },
              768: {
                slidesPerView: 5,
                spaceBetween:30
              }
            }}
          >
            {chars?.map((char, index) => char.image.url &&
                <SwiperSlide key={index}>
                  <div
                    className={`card relative text-white rounded-md border-solid border-2 border-white overflow-hidden m-0 cursor-pointer`}
                    onClick={() => selectCard(char)}
                    onMouseEnter={() => setCurrentChar(char.image.url)}
                  >
                    <img src={char.image.url} alt={char.name} className={`${!char.selected && 'opacity-50'}`} />
                    {!char.selected && <span className="block absolute top-0 right-2">NEW</span>}
                  </div>
                </SwiperSlide>
            )}
          </Swiper>
        </div>
        : 
        <div className="card-container flex flex-wrap justify-center md:justify-start gap-3 md:w-2/3">
          {(chars && chars.length > 0) ?
            chars.map((char, index) => char.image.url &&
              <div
                key={index}
                className={`card relative text-white rounded-md border-solid border-2 border-white overflow-hidden m-0 cursor-pointer`}
                onClick={() => selectCard(char)}
                onMouseEnter={() => setCurrentChar(char.image.url)}
              >
                <img src={char.image.url} alt={char.name} className={`${!char.selected && 'opacity-50'}`} />
                {!char.selected && <span className="block absolute top-0 right-2">NEW</span>}
              </div>
            )
            :
            undefined
          }
        </div>
      }
      
    </Fragment>
  )
}