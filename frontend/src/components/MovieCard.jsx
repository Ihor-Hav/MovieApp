import React from 'react'
import { Star } from 'lucide-react'

export default function MovieCard({
  movie: { title, vote_average, poster_path, original_language, release_date },
}) {
  return (
    <div className="bg-blue-900/40 rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300">
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}
        className="w-full"
      />

      <div className="p-4 text-white space-y-2">
        <h3 className="text-xl font-semibold leading-snug">{title}</h3>

        <div className="flex items-center text-sm text-blue-100 gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
          </div>

          <span>•</span>
          <span className="uppercase">{original_language}</span>

          <span>•</span>
          <span>{release_date ? release_date.split('-')[0] : 'N/A'}</span>
        </div>
      </div>
    </div>
  )
}
