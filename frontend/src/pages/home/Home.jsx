import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import AdminClothesPanel from './clothes/AdminClothesPanel'
import UserNav from '../../components/Nav/userNav'




const Home = () => {
    return (
        <div>
            <UserNav/>

            <Banner />
            <TopSellers />
            <AdminClothesPanel/>
            




        </div>
    )
}

export default Home
