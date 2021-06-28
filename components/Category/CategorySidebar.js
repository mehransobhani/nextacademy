import Link from "next/link";
import React, {useEffect} from "react";
import {fetchCategory} from "../../redux/actions";
import {connect} from "react-redux";

function CategorySidebar (props) {


    useEffect( () => {
        function reportWindowSize() {
            if (window.innerWidth >= 992){
                if(document.body.style.overflow === 'hidden'){
                    document.body.style.overflow = "unset"
                }
                if(document.getElementById('search-categories-wrapper') && document.getElementById('search-categories-wrapper').style.display === "none"){
                    document.getElementById('search-categories-wrapper').style.display = "block";
                }
            }
            else{
                if(document.getElementById('search-categories-wrapper') && document.getElementById('search-categories-wrapper').style.display === "block"){
                    document.getElementById('search-categories-wrapper').style.display = "none";
                }
            }
        }

        window.onresize = reportWindowSize;
    }   , [])

    const closeCategory = () => {
        document.getElementById('search-categories-wrapper').style.display = "none";
        document.body.style.overflow = 'unset';
    }


    return <div className={"search-categories-content-wrapper"}>
        <div className={"search-categories-content-wrapper-header"}>
            <h5>دسته بندی ها</h5>
            <svg onClick={closeCategory} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-x-square d-lg-none cursor-pointer" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </div>
        <hr className="solid mb-2"/>
        <ul className="d-lg-none">
            {
                props.categories.map((category) => {
                    return <li key={category.id}>
                        <label className="mr-2 mb-0" htmlFor={"category-"+category.id+""}>
                            <Link scroll={false} href={"/category/"+category.art_url} >
                                <a onClick={closeCategory}>
                                    {category.name}
                                </a>
                            </Link>
                        </label>
                    </li>
                })
            }
        </ul>
        <ul className="d-none d-lg-block">
            {
                props.categories.map((category) => {
                    return <li key={category.id}>
                        <Link scroll={false} href={"/category/"+category.art_url} >
                            <a>
                                {category.name}
                            </a>
                        </Link>
                    </li>
                })
            }
        </ul>
    </div>

}


const mapStateToProps = state => ({
    ...state.category
});

const mapDispatchToProps = dispatch => ({
    fetchCategory: (payload) => dispatch(fetchCategory(payload))
});

export default connect(
    mapStateToProps , mapDispatchToProps
)(CategorySidebar)
