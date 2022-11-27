import React, {FunctionComponent, useState} from 'react';
import {SearchForm} from '../components/search-form/search-form';
import {Preloader} from '../components/preloader/preloader';
import {MoviesCardList} from '../components/movies-card-list/movies-card-list';
import {ButtonView} from '../services/types/data';

export const Movies: FunctionComponent = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false)

  return (
    <>
      <SearchForm/>
      {
        isSearching
          ? <Preloader/>
          : <MoviesCardList buttonView='add'/>
      }
    </>
  )
}