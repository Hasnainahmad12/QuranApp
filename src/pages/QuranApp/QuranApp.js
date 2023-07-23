import axios from 'axios'
import React, { useState } from 'react'
import { PulseLoader } from 'react-spinners';

const QuranApp = () => {
  // const [userInput, setUserInput] = useState('')
  // const [data, setData] = useState([])
  // const [isLoading, setIsLoading] = useState(false);
    

  // const handleData = () => {
  //   setIsLoading(true)
  //   axios.get(`https://quranenc.com/api/v1/translation/sura/urdu_junagarhi/${userInput}`)
  //     .then(response => {
  //       console.log(response.data)
  //       setData(response.data.result)
  //       setIsLoading(false)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       setIsLoading(false)
  //     })
  // }

  const [userInput, setUserInput] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('urdu_junagarhi');

  const handleData = () => {
    setIsLoading(true);

    const apiUrl =
      selectedLanguage === 'urdu_junagarhi'
        ? `https://quranenc.com/api/v1/translation/sura/urdu_junagarhi/${userInput}`
        : `https://quranenc.com/api/v1/translation/sura/english_saheeh/${userInput}`;

    axios
      .get(apiUrl)
      .then(response => {
        console.log(response.data);
        setData(response.data.result);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleLanguageChange = e => {
    setSelectedLanguage(e.target.value);
  };



  return (
    <div>
      <div class="main">

      {isLoading &&

            <div className='loading-spinner-background'
                style={{
                    zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


                }}
            >
                <PulseLoader

                    size={18}
                    color={"#1AA7EC"}
                    // height={4}
                    loading={isLoading}
                />
            </div>
            }


        <div class="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
          <div class="hero">
            <div class="hero-headline flex flex-col items-center justify-center pt-16 text-center">
              <h1 class=" font-bold text-3xl text-gray-900">All Quran With Translation</h1>
              <p class=" font-base text-base text-gray-600">Search Any Surah, Urdu & English Translation</p>
              <p class=" font-base text-base text-gray-600">Hasnain Bangash</p>
            </div>
            <div class="box pt-6">
              <div class="box-wrapper">
                <div class=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                  <button class="outline-none focus:outline-none">
                    <svg class=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                  <input
                    type="search"
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="search"
                    x-model="q"
                    class="w-full pl-4 text-sm font-semibold outline-none focus:outline-none bg-transparent"
                  />

                    <div className='flex gap-2 justify-center items-center'>
                    <div className="select">
                      <select
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        className="text-sm flex justify-center px-3 items-center outline-none focus:outline-none bg-transparent"
                      >
                        <option value="urdu_junagarhi">Urdu</option>
                        <option value="english_saheeh">English</option>
                      </select>
                    </div>

                    <div className=''>
                      <button onClick={handleData} className='h-auto w-full px-3 flex justify-center bg-red-300 text-lg font-semibold py-1 rounded-sm'>FIND</button>
                    </div>
                    </div>

                </div>
              </div>
            </div>

            <section id="photos" class="my-5 grid grid-cols-1 md:grid-cols-4 gap-4">
              {data.map((item) => (
                <div class="border border-gray-300 p-4 rounded text-right">
                  <h2 class="text-xl font-semibold mb-2">{item.sura}</h2>
                  <p class="text-gray-600 font-semibold ">{item.arabic_text}</p>
                  <p class="text-gray-600">{item.translation}</p>
                </div>
              ))}
            </section>
          </div>
        </div>

      </div>
    </div>
  )
}

export default QuranApp
