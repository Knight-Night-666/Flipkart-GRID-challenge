import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'

import './App.css';

const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [Buyadd, setBuyadd] = useState('')
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item, Buyadd) => {
    console.log("buyer", Buyadd)
    await (await marketplace.purchaseItem(item.itemId, Buyadd, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0", color: 'floralwhite' }}>
      <h2 className='mt-5 pt-4'>Loading...</h2>
    </main>
  )

  return (
  
    <div className="flex navgap justify-center">
      {/* <img class="img" src="abstract.png"/> */}
      {items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card className="gol">
                  <Card.Img variant="top" src={item.image} className="Card-Size" />
                  <Card.Body color="secondary">                  
                  </Card.Body>
                  <Card.Footer>
                    <div className='row'>
                      <div className="col">
                      <Card.Title>{item.name}</Card.Title>

                        </div>
                      <div className="col-12">
                      <Card.Text>
                      {item.description}
                    </Card.Text>
                        </div>
                    <input className='col-11 mt-3 form-control' onChange={(e) => setBuyadd(e.target.value)} type="text" placeholder="Enter the address of the buyer" id="buyadd" name="buyadd"/>

                      <Button className='col-12 mt-2 btn-col' onClick={() => buyMarketItem(item,Buyadd)} variant="danger" size="lg">
                        Transfer NFT
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0", color: 'floralwhite' }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );
}
export default Home