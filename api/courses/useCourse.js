import data from '../../data.json'
import { useState, useEffect } from 'react'

export const useCourse = () => { 
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setCourses(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, []);

    return { courses, loading, error };
};