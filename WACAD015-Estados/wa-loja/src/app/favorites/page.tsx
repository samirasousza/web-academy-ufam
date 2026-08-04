'use client'
import { useContext } from 'react'
import FavoritesList from '../components/FavoritesList/FavoritesList'
import { FavContext } from '../State/FavoritesProvider';

export default function FavoritesPage() {
  const { favorites, setFavorites } = useContext(FavContext);

  return (
    <main>
      <div className='container p-5'>
        <FavoritesList
          favoriteProducts={favorites}
          setFavorites={setFavorites}
        />
      </div>
    </main>
  )
}
