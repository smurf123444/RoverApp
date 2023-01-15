import { useRouter } from 'next/router'
import sqlite3 from 'sqlite3'
import React, {useEffect} from "react";
import { getCookie } from 'typescript-cookie';


const ListingPage = (props) => {
  const router = useRouter()
  const { listings } = props


/* 

// Use a useEffect hook to check if the user is logged in
useEffect(() => {
  let cookie = getCookie('name')
   if(cookie !='value')
   {
       router.push('/login')
   }
// If the user is not logged in, redirect them to the login page
}, [router]);


 */

  return (
    <div>
      {listings.map(listing => (
        <div key={listing.id}>
          <h1>{listing.title}</h1>
          <p>{listing.description}</p>
          <p>Price: ${listing.price}</p>
          <p>Owner: {listing.owner}</p>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const db = new sqlite3.Database(process.env.SQLITE_DATABASE)
  let listings = []
  await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM listings`, [], (err, rows) => {
      if (err) {
        reject(err)
      }
      listings = rows
      resolve(rows)
    })
  })
  db.close()
  return {
    props: {
      listings
    }
  }
}


export default ListingPage
