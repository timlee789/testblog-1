import db from '../utils/db';
import StoreInfo from '../components/flyer/storeinfo';
//import Layout from '../components/flyer/layout';
import Users from '../models/Users';
import { useSession } from 'next-auth/react';
import Productpage from '../components/flyer/productpage';
import { sanityClient, urlFor } from "../sanity";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Banner from "../components/blog/Banner";
import BannerBottom from "../components/blog/BannerBottom";
import Header from "../components/blog/Header";
import Footer from "../components/blog/Footer";
import Feed from '../components/youtube/Feed';



export default function Home({storeinfo, posts}) {
  const {status, data: session} = useSession();
  console.log(posts)
  return (
    <div>
      <Head>
        <title>My Blog | Explore the new horizon</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>
       <Header />

      {session?.user?.email? (
        // <div>{session.user._id}
        <div>
          <Productpage />
        </div>
        //</div>
      ) :  ( 
      <main className="font-bodyFont">
        <div >
       
        {/* ============ Header Start here ============ */}
     
        {/* ============ Header End here ============== */}
        {/* ============ Banner Start here ============ */}
        <Banner />
        {/* ============ Banner End here ============== */}
        <div className="max-w-7xl mx-auto h-60 relative">
          <BannerBottom />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6 px-4">
          {posts.slice(0, 3).map((post) =>(
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border-[1px] border-secondaryColor border-opacity-40 h-[450px] group m-2">
                <div className="h-3/5 w-full overflow-hidden">
                  <Image width={380} height={350} src={urlFor(post.mainImage).url()} alt="he"
                  className="w-full h-full object-cover brightness-75 gourp-hover:brightness-100 duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="h-2/5 w-full flex flex-col justify-center">
                  <div className="flex justify-between items-center px-4 py-1 border-b-[1px] border-b-gray-500">
                    <p className="font-titleFont text-xl font-bold">{post.title}</p>
                    <img 
                      src={urlFor(post.author.image).url()}
                      alt='authorImg'
                      className="w-12 h-12 rounged-full object-cover"
                    />
                  </div>
                  <p className="py-2 px-2 text-base">
                    {post.description.substring(0, 60)}...by -{" "}
                    <span className="font-semibold"> {post.author.name}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}     
        </div>
        
        <div className="max-w-7xl mx-auto py-6 px-4">
         <Feed />
       </div> 

        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 lg:grid-cols-4  ">
        {storeinfo.slice(0, 8).map((sto) => (
          <StoreInfo
            key={sto._id}
            id={sto._id}
            banner={sto.banner}
            url={sto.url}
            state={sto.state}
            name={sto.name}
            city={sto.city}
            address={sto.address}
            tel={sto.tel}
          />
        ))}
      </div>   
      
    </div> 
   
       </main>
      ) }   
     <Footer />
    </div>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const users = await Users.find().sort({ state: 1 }).lean();
  const query = `*[_type == "post"] {
    _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug
  }`
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      storeinfo: users.map((sto) => ({
        _id: sto._id.toString(),
        name: sto.name || null,
        city: sto.city || null,
        state: sto.state || null,
        address: sto.address || null,
        tel: sto.tel || null,
        banner: sto.banner || null
      })),
      posts,
    },
  };
}
