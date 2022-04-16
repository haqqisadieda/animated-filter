import './App.css';
import { useEffect, useState } from 'react';
import Movie from './components/Movie';
import Filter from './components/Filter';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [popular, setPopular] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeGenre, setActiveGenre] = useState(0);

    useEffect(() => {
        fetcPopular();
    }, []);

    const fetcPopular = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/popular?api_key=6bcd4aef593e65f3f17b4b7770045930'
        );
        const movies = await data.json();
        setPopular(movies.results);
        setFiltered(movies.results);
    };
    return (
        <div className='App'>
            <Filter
                popular={popular}
                setFiltered={setFiltered}
                activeGenre={activeGenre}
                setActiveGenre={setActiveGenre}
            />
            <motion.div layout className='popular-movie'>
                <AnimatePresence>
                    {filtered.map((movie) => {
                        return <Movie key={movie.id} movie={movie} />;
                    })}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default App;
