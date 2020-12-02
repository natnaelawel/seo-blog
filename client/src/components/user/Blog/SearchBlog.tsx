import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getSearchResult } from '../../../actions/blog'

function SearchBlog({handleSearchResult, handleSearchTerm}) {
    const [searchQuery, setSearchQuery] = useState("")
    // const {data:blogs,isLoading, error } = useQuery(['blogs', {search_query: searchQuery}],  getSearchResult );
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const blogs = await getSearchResult({search_query: searchQuery});
        handleSearchResult(blogs, searchQuery)
        console.log('blogs data ', blogs)
    }
    useEffect(() => {
        // if(searchQuery){
            // const fetchData = async()=>{
            //     const blogs = await getSearchResult(searchQuery);
            //     // setSearchResult(blogs)
            //     console.log('blogs data ', blogs)
            // }
            // fetchData()
        // }else{

        // }
        handleSearchTerm(searchQuery)
    }, [searchQuery])

    
    return (
        <div className="flex justify-end m-3">
            <form className="w-1/2 lg:w-1/3 flex " onSubmit={handleSubmit} >
            <input type="text" className=" py-3 px-5 outline-none border-2 border-r-0 flex-1 rounded-l-full text-xl" placeholder="Search here..." onChange={(e)=>setSearchQuery(e.target.value)}/>
            <button className="focus:outline-none focus:border-transparent outline-none py-3 px-10 text-lg text-white bg-blue-500 rounded-r-full hover:bg-blue-900" type="submit">Search</button>
            </form>
            
        </div>
    )
}

export default SearchBlog
