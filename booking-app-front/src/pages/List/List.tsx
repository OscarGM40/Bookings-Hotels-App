import { format } from 'date-fns'
import { FC, useState } from 'react'
import { DateRange } from 'react-date-range'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import SearchItem from '../../components/SearchItem/SearchItem'
import './List.scss'

type LocationProps = {
  state: {
    destination: string
    date: any
    options: {
      adult: number
      children: number
      room: number
    }
  }
}

interface ListProps {}

const List: FC<ListProps> = () => {
  const { t } = useTranslation('global')
  const location = useLocation() as LocationProps // type assertion
  const [destination, setDestination] = useState(location.state.destination)
  const [date, setDate] = useState(location.state.date)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)

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
              <label>Destination</label>
              <input type='text' placeholder={destination} />
            </div>
            <div className='listItem'>
              <label>Check-in Date</label>
              <span className="listCheck" onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                'MM/dd/yyyy'
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection as any])}
                  ranges={date}
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
                  <input type='number' className='listOptionInput' />
                </div>

                <div className='listOptionItem'>
                  <span className='listOptionText'>
                    Max price <small>(per night)</small>
                  </span>
                  <input type='number' className='listOptionInput' />
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

            <button className='searchBtn'>Search</button>
          </div>
          <div className='listResult'>
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  )
}
export default List
