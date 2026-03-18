import './App.css'
import { Button } from './components/atoms/Button.jsx'
import { SearchInput } from './components/atoms/SearchInput.jsx'
import { LargeCard } from './components/molecules/LargeCard.jsx'
import { SearchSection } from './components/organisms/SearchSection.jsx'
import { SmallCards } from './components/molecules/SmallCards.jsx'
import { Footer } from './components/organisms/Footer.jsx'
import { Header } from './components/organisms/Header.jsx'

function App() {

  return (
    <>

      <div>
        {/* Header with log + buttons */}
        <Header/>

        {/* Search Section */}
        <SearchSection/>
        

        {/* Main */}
        <div>
          {/* Cards section: Small Cards */}
          <div className='flex flex-col w-full h-auto py-2'>
            
            <span
            className='text-2xl md:text-3xl font-bold text-[#5D9C42]  ml-10 mx-auto w-fit'
            >
              Buscar por tipo de alojamiento
            </span>

            {/* className='mt-2 ml-14 flex flex-wrap w-fit gap-4'   */}
            {/* div de smallcards */}
            <div className='grid grid-cols-1 m-1 mx-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              <SmallCards text={'Hoteles'}/>
              <SmallCards text={'Departamentos'}/>
              <SmallCards text={'Hostales'}/>
              <SmallCards text={'Desayunos'}/>
            </div>  
            
            
          </div>

          {/* Large Cards section 2 */}
          <div className='bg-[#F0F7ED] pt-8 pb-10 px- md:px-10'>

            <h2 className='text-2xl md:text-3xl font-bold text-[#5D9C42]   w-fit '>
              Recomendaciones
            </h2>

            {/* Large Cards */}

            <div className='grid grid-cols-1 m-6 md:grid-cols-2 gap-4 md:gap-6 lg:gap-x-8'>

              <div className='p-1 max-w-3xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>

              <div className='p-1 max-w-3xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-3xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-3xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-3xl'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-3xl hidden md:block'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-3xl hidden md:block'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-3xl hidden md:block'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-3xl hidden md:block'>
                <LargeCard className='' text={'Hotel'}/>
              </div>
              
              <div className='p-1 max-w-3xl hidden md:block'>
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
