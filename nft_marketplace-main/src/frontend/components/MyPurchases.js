import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'

import './App.css';

export default function MyPurchases({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState([])
  const [Buyadd, setBuyadd] = useState('')
  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user

    const filter =  marketplace.filters.Bought(null,null,null,null,null,null,null,null,account)

    const filter2 = nft.filters.Bought(null,null,null,null,null,null,null,null,account)

    let results = await marketplace.queryFilter(filter)
    let results2 = await nft.queryFilter(filter2)
    console.log(results)
    console.log(results2)
    results = results.concat(results2)
    //Fetch metadata of each nft and add that to listedItem object.
    let purchases = await Promise.all(results.map(async i => {
      // fetch arguments from each result
      i = i.args
      // get uri url from nft contract
      const uri = await nft.tokenURI(i.tokenId)
      let owner = await nft.ownerOf(i.tokenId)
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri)
      const metadata = await response.json()
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(i.itemId)
      // define listed item object
      owner = owner.toLowerCase()
      console.log("Check:",account,owner)
      if(account==owner)
      {
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          sno: metadata.sno,
          warranty: metadata.warranty,
          genesis : metadata.date,
          tokenId : i.tokenId
        }

        return purchasedItem
      }
      return []
    }
    ))

    // let unq = []
    // let ansunq = []
    // for( let i = purchases.length-1; i>=0; i--)
    // {
    //   let item = purchases[i]
    //   if(!unq.includes(item.sno))
    //   {
    //     ansunq.push(item)
    //     unq.push(item.sno)
    //   }
    // }
    // purchases = ansunq.reverse()
    // let unq = [ ...new Set(purchases.map(item => item.sno))]
    // console.log(unq)
    // let ansunq = []
    // for( let i = purchases.length-1; i>=0; i--)
    // {
    //   let item = purchases[i]
    //   if(unq.includes(item.sno))
    //   {
    //     ansunq.push(item)
    //     unq.splice(unq.indexOf(item.sno),1)
    //   }
    // }
    // console.log(ansunq)
    // purchases = ansunq
    setLoading(false)
    setPurchases(purchases)
  }
  const TransferMarketItem = async (item, Buyadd) => {
    console.log("buyer", Buyadd)
    const id = await nft.tokenCount()
    // await(await nft.approval(Buyadd, id)).wait()
    await (await nft.buy(id, item.itemId, Buyadd)).wait()
    
    console.log("WHaDDuP")
    loadPurchasedItems()
  }
  async function checknow(item)
  {
    const CurrentDate = Math.floor(new Date().getTime() / 1000);
    let verifyStatus  = false
    if(CurrentDate > (item.genesis + item.warranty))
    {
      verifyStatus = true
    }
    // console.log("STATUS : ", item.name, " " , verifyStatus)
    return verifyStatus
  }
  const VerifyMarketItem = async (item) =>
  {
    const CurrentDate = Math.floor(new Date().getTime() / 1000);
    await marketplace.verifyItem(item.itemId, CurrentDate, item.genesis)
    const verifyStatus  = await marketplace.isValid()
    if(verifyStatus)
    {
      alert("Your NFT is valid.")
    }
    else {
      alert("Your NFT has expired. Removing Ownership.")
      await nft.destroyItem(item.tokenId)
      window.location.reload()
    }


    loadPurchasedItems()
  }

  useEffect(() => {
    loadPurchasedItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0", color: 'floralwhite'}}>
      <h2 className='mt-5 pt-4'>Loading...</h2>
    </main>
  )
  return (
    <div className="flex navgap justify-center">
      {purchases.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {purchases.map((item, idx) => (
              (item.name) ?
            <Col key={idx} className="overflow-hidden">
              <Card className='gol'>
                <Card.Img variant="top" src={item.image} className="Card-Size" />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text className='row justify-content-center'>
                  {
                  (Math.floor(new Date().getTime() / 1000) < (item.genesis + item.warranty)) ?
                  <input className='col-11' onChange={(e) => setBuyadd(e.target.value)} type="text" placeholder="Enter the address of the buyer" id="buyadd" name="buyadd"/> 
                  :
                  "Expired"}
                  </Card.Text>
                </Card.Body>
                <Card.Footer> {
                (Math.floor(new Date().getTime() / 1000) < (item.genesis + item.warranty)) ?
                    <div className='d-grid'>
                      <Button onClick={() => TransferMarketItem(item,Buyadd)} className="btn-col" variant='danger' size="lg">
                        Transfer NFT
                      </Button>
                    </div>
                  : null}
                  <div className='d-grid'>
                  <Button className ="mt-2 btn-col" onClick={() => VerifyMarketItem(item)} variant='danger' size="lg">
                        Verify NFT
                  </Button>
                  </div>
                  </Card.Footer>
              </Card>
            </Col> : null
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0", color: 'floralwhite' }}>
            <h2>No purchases</h2>
          </main>
        )}
    </div>
  );
}