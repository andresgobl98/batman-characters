import React, { useState, useEffect, Fragment } from 'react'
import {Swiper} from 'swiper'
import {SwiperSlide} from 'swiper/react'

const Home = ({characters}) => {
  const [chars, setChars] = useState()
  const [currentChar, setCurrentChar] = useState()
  const [selectedChar, setSelectedChar] = useState()

  useEffect(() => {
    if (characters.length) {
      setChars(characters)
    }
  }, [characters])

  const selectCard = (character) => {
    const newChars = chars.map(char => char.id === character.id ? {...char, selected: true} : char)
    setChars(newChars)
    setSelectedChar(character)
  }

  const goBack = () => {
    setSelectedChar(undefined)
  }

  return (
    <div className="home flex flex-col md:flex-row justify-center items-center">
      {selectedChar &&
        <button 
          className="text-white mb-3" 
          onClick={() => goBack()}
        >
          Return
        </button>
      }
      {selectedChar ? 
        <CharacterBio character={selectedChar} goBack={goBack} />
        : 
        <CharacterGallery chars={chars} />
      }
      <div className={`char-image w-full mt-3 md:mb-0 md:w-1/3 flex justify-center md:ml-3`}>
        <img src={currentChar} alt="" />
      </div>
    </div>
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

const CharacterGallery = ({chars}) => {
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
      {viewportWidth <= 768 ? 
        <Swiper 
          slidesPerView={'auto'} 
          spaceBetween={30} 
          pagination={{
            "clickable": true
          }} 
          className="mySwiper"
        >
          {(chars && chars.length > 0) ?
            chars.map((char, index) => char.image.url &&
              <SwiperSlide key={index}>
                <div
                  className={`card relative w-28 h-28 text-white rounded-md border-solid border-2 border-white overflow-hidden m-0 cursor-pointer`}
                  onClick={() => selectCard(char)}
                  onMouseEnter={() => setCurrentChar(char.image.url)}
                  onMouseLeave={() => setCurrentChar("")}
                >
                  <img src={char.image.url} alt={char.name} className={`${!char.selected && 'opacity-50'}`} />
                  {!char.selected && <span className="block absolute top-0 right-2">NEW</span>}
                </div>
              </SwiperSlide>
            )
            :
            undefined
          }
        </Swiper>
        : 
        <div className="card-container flex flex-wrap justify-center md:justify-start gap-3 md:w-2/3">
          {(chars && chars.length > 0) ?
            chars.map((char, index) => char.image.url &&
              <div
                key={index}
                className={`card relative w-28 h-28 text-white rounded-md border-solid border-2 border-white overflow-hidden m-0 cursor-pointer`}
                onClick={() => selectCard(char)}
                onMouseEnter={() => setCurrentChar(char.image.url)}
                onMouseLeave={() => setCurrentChar("")}
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