import './App.css'
import { Button } from './components/atoms/Button.jsx'
import { SearchInput } from './components/atoms/SearchInput.jsx'
import { LargeCard } from './components/molecules/LargeCard.jsx'
import { SmallCards } from './components/molecules/SmallCards.jsx'
import { Footer } from './components/organisms/Footer.jsx'
import { Header } from './components/organisms/Header.jsx'

function App() {

  return (
    <>

      <div>
        {/* Header with log + buttons */}
        <Header/>

        {/* Heading */}
        <div className='bg-[#5D9C42] p-4'>

          <h1 className='flex text-white p-1.5 w-full text-5xl justify-center'>Busca ofertas en hoteles, casas y mucho más</h1>

          {/* Component SearchInput + button */} 
          <div className=' flex justify-center items-center gap-3 my-4 mx-auto w-fit'>

            <SearchInput
            svg={
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="size-6 text-gray-300">
                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
              </svg>

            }
            className='bg-white  items-center p-1.5 w-130 rounded-md text-gray-400'
            placeholder={'¿A dónde vamos?'}
            />


            <SearchInput
            svg={
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
              </svg>

            } 
            className='bg-white items-center p-1.5 w-130 rounded-md justify-start text-gray-400 '
            placeholder={'Check in - Check out'}
            />

            <Button
            text={'Buscar'}
            className={'border p-1.5 border-white text-white rounded-md  w-48  hover:text-[#5D9C42] hover:bg-white cursor-pointer justify-end'}
            />
          </div>

        </div>

        {/* Main */}
        <div>
          {/* Cards section 1 */}
          <div className='flex flex-col w-full h-88 py-2'>
            
            <span
            className=' text-3xl font-bold text-[#5D9C42]  ml-10 mx-auto w-fit'
            >
              Buscar por tipo de alojamiento
            </span>

            {/* div de smallcards */}
            <div className='mt-2 ml-14 flex flex-wrap w-fit gap-4'>
              <SmallCards text={'Hoteles'}/>
              <SmallCards text={'Departamentos'}/>
              <SmallCards text={'Hostales'}/>
              <SmallCards text={'Desayunos'}/>
            </div>  
            
            
          </div>

          {/* Large Cards section 2 */}
          <div className='bg-[#F0F7ED] pt-4'>

            <h2 className='text-2xl md:text-3xl font-bold text-[#5D9C42] ml-10  w-fit '>
              Recomendaciones
            </h2>

            {/* Large Cards */}

            <div className='grid grid-cols-2 gap-3 ml-14 gap-x-48 pb-8 w-fit'>

              <div className='p-1 max-w-6xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>

              <div className='p-1 max-w-6xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-6xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-6xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-6xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-6xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-6xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-6xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-6xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-6xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>

            </div>
          </div>

        </div>

        {/* footer */}
        <Footer/>
        


      </div>
      
      
    </>
  )
}

export default App
