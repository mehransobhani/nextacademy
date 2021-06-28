import React from 'react';
import SearchSlider from "../components/SearchSlider/SearchSlider";
import MostPopular from "../components/MostPopular/MostPopular";
import OurOffer from "../components/OurOffer/OurOffer";
import CourseIndex from "../components/Course/CourseIndex/CourseIndex";
import * as constants from '../components/constants';
import Head from "next/head";
import Router from "next/router";
import queryString from "query-string";
import router from "next/router";

export default class Home extends React.Component{

    static async getInitialProps(ctx) {
        const { query } = ctx;

        let data = {
            error : false
        };

        try {
            const mostPopularArtsRes = await fetch(constants.apiURL+'/api/most-popular')
            const mostPopularArts = await mostPopularArtsRes.json()

            data.mostPopularArts = mostPopularArts;

        }
        catch {
            data.error = true;

        }

        try {
            const ourOfferRes = await fetch(constants.apiURL+'/api/our-offer')
            const ourOffer = await ourOfferRes.json()

            data.ourOffer = ourOffer;


        }
        catch {
            data.error = true;
        }


        return data;


    }

    handleSearch = (e , search) => {
        e.preventDefault()
        Router.push('/search?q=' + search)
    }

    handleCategorySearchChange = (e , id) => {
        const checked = e.target.checked;
        const array = [];
        if(checked){
            array.indexOf(id) === -1 ? array.push(id) : null;
        }
        const object = {
            category : array
        }
        const string = queryString.stringify(object, {arrayFormat: 'bracket'});
        router.push('/search?'+string);
    }

    render(){

        return (
            <React.Fragment>
                <Head>
                    <title>هنری | تحقق رویای هنرمندانه‌ ی تو</title>
                </Head>
                <SearchSlider handleSearch={this.handleSearch} handleCategorySearchChange={this.handleCategorySearchChange} />
                <MostPopular arts={this.props.mostPopularArts} />
                <OurOffer courses={this.props.ourOffer} />
                <CourseIndex />
            </React.Fragment>
        )
    }

}
