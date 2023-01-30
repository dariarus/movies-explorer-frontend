import {ForwardedRef, useEffect, useRef} from 'react';
import {TMovieItem, TSavedMovieItem} from '../services/types/data';

/* Модифицированный код нового хука в React-е более поздней версии:
https://stackoverflow.com/questions/62238716/using-ref-current-in-react-forwardref */
export const useForwardRef = <T, >(
  ref: ForwardedRef<T>,
  initialValue: any = null
) => {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      targetRef.current = ref.current as T;
    }
  }, [ref]);

  return targetRef;
};

export const combineMinutesString = (min: number) => {
  const minRest = min % 10;
  return `${min === 1
    ? '0' + min + ' минута'
    : min === 0
      ? '0' + min + ' минут'
      : minRest === 1
        ? min + ' минута'
        : minRest === 0
          ? min + ' минут'
          : minRest <= 4 && min >= 22
            ? min + ' минуты'
            : minRest <= 4 && min < 10
              ? '0' + min + ' минуты'
              : minRest > 4 && min < 10
                ? '0' + min + ' минут'
                : min + ' минут'}`;
}

export const convertSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 60 / 60);
  const minutesHourRest = Math.floor(seconds / 60) - (hours * 60); // остаток минут от часа

  if (seconds < 3600) {
   return combineMinutesString(minutes);
  }

  return `0${hours === 1
    ? hours + ' час'
    : hours <= 4
      ? hours + ' часа'
      : hours + ' часов'} :
      ${combineMinutesString(minutesHourRest)}`
}

export const setOptionsForInputValidation = (inputName: string) => {
  if (inputName === 'name') {
    return {
      required: "Необходимо заполнить данное поле",
      pattern: {
        value: /[a-zA-Zа-яА-Я -]/,
        message: "Имя может содержать только кириллицу, латиницу, пробел и дефис",
      },
      minLength: {
        value: 2,
        message: "Минимальная длина имени - 2 символа",
      },
      maxLength: {
        value: 30,
        message: "Максимальная длина имени - 30 символов",
      },
    }
  } else if (inputName === 'email') {
    return {
      required: "Необходимо заполнить данное поле",
      pattern: {
        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Введите корректный e-mail",
      },
    }
  } else {
    return {
      required: "Необходимо заполнить данное поле"
    }
  }
}

export const getWindowWidth = () => {
  const {innerWidth} = window;
  return {innerWidth};
}

export const setRenderingTimer = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getMoviesToShow = (isShortFilm: boolean, originalMoviesArray: Array<TMovieItem>, sliceEnd: number) => {
  if (isShortFilm) {
    return originalMoviesArray.filter(movie => movie.duration <= 2400).slice(0, sliceEnd)
  } else {
    return originalMoviesArray.slice(0, sliceEnd)
  }
}

// использую type predicate для определения типа массива из пропсов для сохранения найденных фильмов в нужный slice
export const isSavedMovie = (movie: TSavedMovieItem | TMovieItem): movie is TSavedMovieItem => {
 return (movie as TSavedMovieItem).owner !== undefined;
}

export const isArrayOfSavedMovies = (movieArray: Array<TSavedMovieItem | TMovieItem>): movieArray is Array<TSavedMovieItem> => {
  return movieArray.every((movie) => {
    isSavedMovie(movie);
  })
}