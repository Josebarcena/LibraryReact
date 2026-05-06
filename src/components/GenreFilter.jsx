function GenreFilter({ genres, selectedGenres, onToggle }) {
    return (
        <aside>
            <h3>Géneros</h3>
            <ul>
                {genres.map((genre) => (
                    <li key={genre}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedGenres.includes(genre)}
                                onChange={() => onToggle(genre)}
                            />
                            {genre}
                        </label>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default GenreFilter