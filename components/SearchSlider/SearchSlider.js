import React from "react";
import SearchIcon from "../UI/Icon/SearchIcon";
import axios from "axios";
import * as constants from "../constants";
import Link from "next/link"
import SimpleBar from "simplebar-react"

class SearchSlider extends React.Component{

    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.searchInputRef = React.createRef();



        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && this.searchInputRef && this.wrapperRef.current && this.searchInputRef.current && !this.wrapperRef.current.contains(event.target) && !this.searchInputRef.current.contains(event.target)) {
            this.setState({
                show_search_result_wrapper : false
            })
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    state = {
        search: this.props.inputValue ? this.props.inputValue : '',
        loading: false,
        show_search_result_wrapper : false,
        searchPreview : {
            courses: [],
            arts: []
        },
        noResult: false
    };

    handleChange = (event) => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        this.setState({

            search: event.target.value,
            typingTimeout: setTimeout(() => {
                this.sendToParent(event.target.value);
            }, 300)
        });

    };

    sendToParent = (search) => {
        this.setState({
            noResult : false
        })
        if (search.trim().length <= 2){
            this.setState((prevstate) => {
                return {
                    ...prevstate,
                    searchPreview: {
                        ...prevstate.searchPreview,
                        courses: [],
                        arts: [],
                    }
                }
            })
        }
        if (search.trim().length > 2){
            axios.get(constants.apiURL+'/api/search-preview?q='+search)
                .then((response) => {
                    if (response.data.data.courses.length === 0 && response.data.data.arts.length ===0){
                        this.setState({
                            noResult : true
                        })
                    }
                    this.setState((prevstate) => {
                        return {
                            ...prevstate,
                            searchPreview : {
                                ...prevstate.searchPreview,
                                courses : response.data.data.courses,
                                arts : response.data.data.arts,
                            }
                        }
                    })
                })
                .catch((error) => {
                    console.log(error)
                }
                )
        }

    }


    componentDidUpdate(prevProps) {
        if(this.props.inputValue && prevProps.inputValue !== this.props.inputValue)
        {
            this.setState({
                search : this.props.inputValue
            })
        }
    }


    searchInputFocus = () => {
        this.setState({
            show_search_result_wrapper : true
        })
    }


    render() {
        let search_result = null;
        if(this.state.noResult){
            search_result = <div>نتیجه ای یافت نشد</div>
        }
        else {
            if (this.state.searchPreview.courses.length > 0 && this.state.searchPreview.arts.length === 0) {
                search_result = <React.Fragment>
                    <h5>آموزش ها</h5>
                    <div className={"mr-3"}>
                    {this.state.searchPreview.courses.map((course) => {
                        return <div key={course.id}>
                            <Link scroll={false} href={course.kind === "bundle" ? "/bundles/"+encodeURI(course.urlfa) : "/courses/"+encodeURI(course.urlfa)} key={course.id}>
                                <a className={"search-preview-course-link"}>{course.name}</a>
                            </Link>
                        </div>
                    })}
                    </div>
                </React.Fragment>
            }
            if(this.state.searchPreview.arts.length > 0 && this.state.searchPreview.courses.length === 0){
                search_result = <React.Fragment>
                    <h5>دسته ها</h5>
                    <div className={"mr-3"}>
                    {this.state.searchPreview.arts.map((art) => {
                        return <div key={art.id}>
                            <Link scroll={false} href={"/category/"+encodeURI(art.art_url)} key={art.id}>
                                <a className={"search-preview-course-link"}>{art.artName}</a>
                            </Link>
                        </div>
                    })}
                    </div>
                </React.Fragment>
            }
            if (this.state.searchPreview.arts.length > 0 && this.state.searchPreview.courses.length > 0){
                search_result = <React.Fragment>
                    <h5>آموزش ها</h5>
                    <div className={"mr-3"}>
                    {this.state.searchPreview.courses.map((course) => {
                        return <div key={course.id}>
                            <Link scroll={false} href={course.kind === "bundle" ? '/bundles/' + encodeURI(course.urlfa) : '/courses/' + encodeURI(course.urlfa)} key={course.id}>
                                <a className={"search-preview-course-link"}>{course.name}</a>
                            </Link>
                        </div>
                    })}
                    </div>
                    <hr/>
                    <h5 className={"mt-3"}>دسته ها</h5>
                    <div className={"mr-3"}>
                        {this.state.searchPreview.arts.map((art) => {
                            return <div key={art.id}>
                                <Link scroll={false} href={"/category/"+encodeURI(art.art_url)} key={art.id}>
                                    <a className={"search-preview-course-link"}>{art.artName}</a>
                                </Link>
                            </div>
                        })}
                    </div>
                </React.Fragment>
            }
        }

        return (
            <section className={'search-slider dir-rtl'}>
                <p className={'search-slider-banner'} >خلاقیت و هنر زندگی رو جذاب تر میکنه</p>
                <p className={'search-slider-subtitle'} >دسترسی به بهترین هنرمندان که یادگیری هنرهای جدید را آسان می کنند</p>
                <div className={'d-block'}>
                    <div className="position-relative d-inline-block search-input-wrapper">
                        <form onSubmit={(event) => this.props.handleSearch(event , this.state.search)}>
                            <button className={'input-search-icon cursor-pointer'}>
                                <SearchIcon />
                            </button>
                            <input
                                ref={this.searchInputRef}
                                onFocus={this.searchInputFocus}
                                className={'search-input'}
                                value={this.state.search}
                                onChange={this.handleChange}
                                type="text"
                                placeholder={'چی دوست داری یاد بگیري؟'}
                            />
                        </form>

                        <SimpleBar style={{position : "absolute"}} className={`search-result-wrapper ${(this.state.searchPreview.courses.length > 0 || this.state.searchPreview.arts.length > 0 || this.state.noResult) && this.state.show_search_result_wrapper ? "active" : ""}`} >
                            <div ref={this.wrapperRef}  >
                                {search_result}
                            </div>
                        </SimpleBar>



                    </div>
                </div>
            </section>
        )
    }

}



export default SearchSlider