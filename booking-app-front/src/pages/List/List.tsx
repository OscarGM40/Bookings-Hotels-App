import { format } from 'date-fns'
import { FC, useContext, useState } from 'react'
import { DateRange } from 'react-date-range'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import SearchItem from '../../components/SearchItem/SearchItem'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './List.scss'

type LocationProps = {
  state: {
    destination: string
    dates: any
    options: {
      adult: number
      children: number
      room: number
    }
  }
}

interface ListProps {}

const List: FC<ListProps> = () => {
  const { t } = useTranslation('translation')
  const location = useLocation() as LocationProps // type assertion
  const [destination] = useState(location.state.destination)
  const [, setDate] = useState(location.state.dates[0])
  const [openDate, setOpenDate] = useState(false)
  const [options] = useState(location.state.options)
  const [min, setMin] = useState<number | null | undefined>(0)
  const [max, setMax] = useState<number | null | undefined>(9999)

  const { dates } = useContext(SearchContext)

  const { data, loading, reFetch } = useFetch(
    `http://localhost:8000/api/hotels?city=${destination}&min=${min}&max=${max}`
  )

  const handleClick = () => {
    reFetch()
  }

  return (
    <div className='list'>
      <Navbar />
      <Header type='list' />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='listSearchTitle'>{t('header')}</h1>
            <hr />
            <div className='listItem'>
              <label>{t('listPageDestination')}</label>
              <input type='text' placeholder={destination} />
            </div>
            <div className='listItem'>
              <label>{t('listPageCheckinDate')}</label>
              <span
                className='listCheck'
                onClick={() => setOpenDate(!openDate)}
              >{`${format(dates[0].startDate, 'MM/dd/yyyy')}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection as any])}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>

            <div className='listItem lastItem'>
              <label>Options</label>
              <hr />
              <div className='listOptions'>
                <div className='listOptionItem'>
                  <span className='listOptionText'>
                    Min price <small>(per night)</small>
                  </span>
                  <input
                    type='number'
                    onChange={(e) => setMin(+e.target.value)}
                    className='listOptionInput'
                  />
                </div>

                <div className='listOptionItem'>
                  <span className='listOptionText'>
                    Max price <small>(per night)</small>
                  </span>
                  <input
                    type='number'
                    onChange={(e) => setMax(+e.target.value)}
                    className='listOptionInput'
                  />
                </div>

                <div className='listOptionItem'>
                  <span className='listOptionText'>Adult</span>
                  <input
                    type='number'
                    className='listOptionInput'
                    placeholder={options.adult.toString()}
                    min={1}
                  />
                </div>

                <div className='listOptionItem'>
                  <span className='listOptionText'>Children</span>
                  <input
                    type='number'
                    className='listOptionInput'
                    placeholder={options.children.toString()}
                    min={0}
                  />
                </div>

                <div className='listOptionItem'>
                  <span className='listOptionText'>Room</span>
                  <input
                    type='number'
                    className='listOptionInput'
                    placeholder={options.room.toString()}
                    min={1}
                  />
                </div>
              </div>
            </div>

            <button className='searchBtn' onClick={handleClick}>
              Search
            </button>
          </div>
          <div className='listResult'>
            {loading ? (
              'loading'
            ) : (
              <>
                {data.map((item: any) => (
                  <SearchItem key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default List
