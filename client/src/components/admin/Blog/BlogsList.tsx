import Link from "next/link"
import { useQuery } from "react-query"
import { getBlogsWithCategoriesAndTags } from "../../../actions/blog"
function index(props) {
    const blogsCategoriesTags = useQuery('blogs' , getBlogsWithCategoriesAndTags, {});
    return (
        <div>
            {JSON.stringify(props)}
        </div>
    )
}

export default index
